import {
  get,
  filter,
  head,
  includes,
  map,
  values,
  uniqBy,
  isUndefined,
} from 'lodash';
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
      const { id, participantIds } = conversation;
      const messages = filter(
        uniqBy(values(allMessages), ({ id: messageId }) => messageId),
        ({
          conversationId,
          trustedFriendConversationId = null,
          woozyStatus = null,
          toUserId = null,
        }) =>
          (id === trustedFriendConversationId &&
            woozyStatus !== WOOZY_STATES.NOT_WOOZY) ||
          (id === conversationId &&
            !(toUserId === authId && woozyStatus === WOOZY_STATES.PENDING)),
      ).sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );

      return {
        ...conversation,
        user: get(users, head(filter(participantIds, (p) => p !== authId))),
        messages,
      };
    })
      .sort(({ messages: aMessages }, { messages: bMessages }) => {
        const lastATimestamp = isUndefined(head(aMessages))
          ? new Date()
          : new Date(head(aMessages).timestamp);
        const lastBTimestamp = isUndefined(head(bMessages))
          ? new Date()
          : new Date(head(bMessages).timestamp);
        return lastATimestamp.getTime() - lastBTimestamp.getTime();
      })
      .reduce(
        (results, m) => ({
          ...results,
          [m.id]: m,
        }),
        {},
      ),
);
