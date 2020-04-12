import { get, isNull } from 'lodash';

export const getUsers = (state) => get(state, 'users', {});

export const getAuthUserId = (state) => get(state, 'auth', null);

export const getAuthUserIsLoggedIn = (state) => !isNull(getAuthUserId(state));
