import { get, isNull, filter, find } from 'lodash';

export const getUsers = (state) => get(state, 'users', {});

export const getAuthUserId = (state) => get(state, 'auth', null);

export const getAuthUserIsLoggedIn = (state) => !isNull(getAuthUserId(state));

export const getNotLoggedInUsers = (state) =>
  filter(getUsers(state), ({ id }) => id !== getAuthUserId(state));

export const getLoggedInUser = (state) =>
  find(getUsers(state), ({ id }) => id === getAuthUserId(state));
