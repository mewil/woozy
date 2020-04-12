export const ADD_AUTH_USER = 'user/ADD_AUTH_USER';
export const addAuthUserAction = ({ user }) => ({
  type: ADD_AUTH_USER,
  payload: { user },
});

export const ADD_USERS = 'user/ADD_USERS';
export const addUsersAction = ({ users }) => ({
  type: ADD_USERS,
  payload: { users },
});

export const FETCH_LOGIN_USER = 'user/FETCH_LOGIN_USER';
export const fetchLoginUserAction = ({ username }) => ({
  type: FETCH_LOGIN_USER,
  payload: { username },
});

export const FETCH_USER = 'user/FETCH_USER';
export const fetchUserAction = ({ username }) => ({
  type: FETCH_USER,
  payload: { username },
});
