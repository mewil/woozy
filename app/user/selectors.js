import { get, isNull, filter } from 'lodash';

export const getUsers = (state) => get(state, 'users', {});

export const getAuthUserId = (state) => get(state, 'auth', null);

export const getAuthUser = (state) =>
  get(getUsers(state), getAuthUserId(state), {});

export const getAuthUserIsLoggedIn = (state) => !isNull(getAuthUserId(state));

export const getNotLoggedInUsers = (state) =>
  filter(getUsers(state), ({ id }) => id !== getAuthUserId(state));

export const getIsFriendContact = (state, id) =>
  Object.values(get(getAuthUser(state), 'avoidingId', {})).includes(id);

export const getIsAvoidedContact = (state, id) =>
  get(getAuthUser(state), 'trustedFriendId', null) === id;
