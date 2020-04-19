import { get, filter, head, includes, map, values, uniqBy } from 'lodash';
import { createSelector } from 'reselect';

import { getNotLoggedInUsers, getUsers, getAuthUserId } from '@woozy/user';

import { WOOZY_STATES } from './constants';

export const getConversations = (state) => get(state, 'conversations', {});

export const getMessages = (state) => get(state, 'messages', {});

export const getMyConversations = createSelector(
  getConversations,
  getAuthUserId,
  (conversations, authId) =>
    filter(conversations, ({ participantIds }) =>
      includes(participantIds, authId),
    ),
);

export const getConversationParticipants = createSelector(
  getMyConversations,
  (conversations) =>
    map(conversations, ({ participantIds }) => values(participantIds))
      .reduce((prev, curr) => prev.concat(curr), [])
      .filter((item, _, arr) => arr.includes(item)),
);

export const getUsersNotInConversations = createSelector(
  getNotLoggedInUsers,
  getConversationParticipants,
  (users, participantIds) =>
    filter(users, ({ id }) => !participantIds.includes(id)),
);

export const getConversationsWithUserAndMessages = createSelector(
  getMyConversations,
  getMessages,
  getUsers,
  getAuthUserId,
  (conversations, allMessages, users, authId) =>
    map(conversations, (conversation) => {
      const { id, participantIds, lastMessage } = conversation;
      const messages = filter(
        uniqBy(
          values(allMessages).concat([lastMessage]).filter(Boolean),
          ({ id: messageId }) => messageId,
        ),
        ({
          conversationId,
          trustedFriendConversationId = null,
          woozyStatus = null,
        }) =>
          (id === trustedFriendConversationId &&
            woozyStatus === WOOZY_STATES.PENDING) ||
          id === conversationId,
      ).sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );
      const nonWoozyMessages = filter(
        messages,
        ({
          woozyStatus = null,
          trustedFriendConversationId = null,
          fromUserId = null,
        }) =>
          woozyStatus === WOOZY_STATES.NOT_WOOZY ||
          woozyStatus === WOOZY_STATES.APPROVED ||
          (id === trustedFriendConversationId &&
            woozyStatus === WOOZY_STATES.PENDING &&
            fromUserId !== authId),
      );

      return {
        ...conversation,
        user: get(users, head(filter(participantIds, (p) => p !== authId))),
        messages,
        lastMessage: head(nonWoozyMessages),
      };
    })
      .sort(
        (
          { lastMessage: a = { timestamp: new Date() } },
          { lastMessage: b = { timestamp: new Date() } },
        ) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      )
      .reduce(
        (results, m) => ({
          ...results,
          [m.id]: m,
        }),
        {},
      ),
);
