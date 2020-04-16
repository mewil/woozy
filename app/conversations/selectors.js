import { get, filter, head } from 'lodash';
import { createSelector } from 'reselect';

import { getNotLoggedInUsers, getUsers, getAuthUserId } from '@woozy/user';

export const getConversations = (state) => get(state, 'conversations', {});
export const getMessages = (state) => get(state, 'messages', {});
export const getRenderedMessages = (state, conversationId) =>
  Object.values(getMessages(state))
    .map(({ messages }) => Object.values(messages))
    .reduce((prev, curr) => prev.concat(curr), [])
    .filter((item) => item.conversationId === conversationId);

// get(state, 'messages', {});

export const getConversationParticipants = (state) =>
  Object.values(getConversations(state))
    .map(({ participantIds }) => Object.values(participantIds))
    .reduce((prev, curr) => prev.concat(curr), [])
    .filter((item, _, arr) => arr.includes(item));

export const getUsersNotInConversations = (state) =>
  filter(
    getNotLoggedInUsers(state),
    ({ id }) => !getConversationParticipants(state).includes(id),
  );

export const getConversationsWithUsers = createSelector(
  getConversations,
  getUsers,
  getAuthUserId,
  (conversations, users, authId) =>
    Object.values(conversations).map((conversation) => ({
      ...conversation,
      user: get(
        users,
        head(
          Object.values(conversation.participantIds).filter(
            (id) => id !== authId,
          ),
        ),
      ),
    })),
);
