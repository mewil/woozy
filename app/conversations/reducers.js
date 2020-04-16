import { get, values } from 'lodash';

import { ADD_CONVERSATIONS, ADD_MESSAGES } from './actions';

export const conversations = (state = {}, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CONVERSATIONS: {
      const newConversations = values(get(payload, 'conversations', {})).reduce(
        (results, c) => ({
          ...results,
          [c.id]: c,
        }),
        {},
      );
      return {
        ...state,
        ...newConversations,
      };
    }

    default:
      return state;
  }
};

export const messages = (state = {}, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_MESSAGES: {
      const newMessages = values(get(payload, 'messages', {})).reduce(
        (results, m) => ({
          ...results,
          [m.id]: m,
        }),
        {},
      );
      return {
        ...state,
        ...newMessages,
      };
    }

    default:
      return state;
  }
};
