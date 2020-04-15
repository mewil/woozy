import { get, isNull, filter } from 'lodash';

export const getUsers = (state) => get(state, 'users', {});

export const getAuthUserId = (state) => get(state, 'auth', null);

export const getAuthUserIsLoggedIn = (state) => !isNull(getAuthUserId(state));

export const getNotLoggedInUsers = (state) =>
  filter(getUsers(state), ({ id }) => id !== getAuthUserId(state));
