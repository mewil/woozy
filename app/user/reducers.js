import { get, values } from 'lodash';

import { ADD_AUTH_USER, ADD_USERS } from './actions';

export const users = (state = {}, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_USERS: {
      const newUsers = values(get(payload, 'users', {})).reduce(
        (results, u) => ({
          ...results,
          [u._id]: u,
        }),
        {},
      );
      return {
        ...state,
        ...newUsers,
      };
    }
    default:
      return state;
  }
};

export const auth = (state = null, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_AUTH_USER: {
      const userId = get(payload, 'user.id', null);
      return userId;
    }
    default:
      return state;
  }
};
