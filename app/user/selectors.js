import { get, isNull, filter } from 'lodash';

export const getUsers = (state) => get(state, 'users', {});

export const getAuthUserId = (state) => get(state, 'auth', null);

export const getLoggedInUser = (state) =>
  get(getUsers(state), getAuthUserId(state), {});

export const getAuthUserIsLoggedIn = (state) => !isNull(getAuthUserId(state));

export const getNotLoggedInUsers = (state) =>
  filter(getUsers(state), ({ id }) => id !== getAuthUserId(state));

export const getIsFriendContact = (state, id) =>
  get(getLoggedInUser(state), 'trustedFriendId', null) === id;

export const getIsAvoidedContact = (state, id) =>
  Object.values(get(getLoggedInUser(state), 'avoidingId', {})).includes(id);

export const getUserFromId = (state, userId) =>
  filter(getUsers(state), ({ id }) => id === userId);
