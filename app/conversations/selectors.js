import { get, filter, head, isUndefined, includes, map, values } from 'lodash';
import { createSelector } from 'reselect';

import { getNotLoggedInUsers, getUsers, getAuthUserId } from '@woozy/user';

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
        allMessages,
        ({ conversationId, trustedFriendConversationId }) =>
          id === conversationId || id === trustedFriendConversationId,
      ).sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );

      return {
        ...conversation,
        user: get(users, head(filter(participantIds, (p) => p !== authId))),
        messages,
        lastMessage: isUndefined(head(messages)) ? lastMessage : head(messages),
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
