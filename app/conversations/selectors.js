import { get, filter, head, isUndefined } from 'lodash';
import { createSelector } from 'reselect';

import { getNotLoggedInUsers, getUsers, getAuthUserId } from '@woozy/user';

export const getConversations = (state) => get(state, 'conversations', {});

export const getMessages = (state) => get(state, 'messages', {});

export const getMyConversations = createSelector(
  getConversations,
  getAuthUserId,
  (conversations, authId) =>
    filter(conversations, ({ participantIds }) =>
      Object.values(participantIds).includes(authId),
    ),
);

export const getConversationParticipants = createSelector(
  getMyConversations,
  (conversations) =>
    Object.values(conversations)
      .map(({ participantIds }) => Object.values(participantIds))
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
    Object.values(conversations)
      .map((conversation) => {
        const { id, participantIds, lastMessage } = conversation;
        const messages = Object.values(allMessages)
          .filter(
            ({ conversationId, trustedFriendConversationId }) =>
              id === conversationId || id === trustedFriendConversationId,
          )
          .sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
          );

        return {
          ...conversation,
          user: get(
            users,
            head(Object.values(participantIds).filter((p) => p !== authId)),
          ),
          messages,
          lastMessage: isUndefined(head(messages))
            ? lastMessage
            : head(messages),
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
