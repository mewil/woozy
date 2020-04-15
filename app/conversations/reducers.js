import { get, values } from 'lodash';

import { ADD_CONVERSATIONS } from './actions';

export const conversations = (state = {}, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CONVERSATIONS: {
      const newConversations = values(get(payload, 'conversations', {})).reduce(
        (results, p) => ({
          ...results,
          [p.id]: p,
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
