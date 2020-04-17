export const FETCH_LOGIN_USER = 'user/FETCH_LOGIN_USER';
export const fetchLoginUserAction = ({ username }) => ({
  type: FETCH_LOGIN_USER,
  payload: { username },
});

export const ADD_AUTH_USER = 'user/ADD_AUTH_USER';
export const addAuthUserAction = ({ user }) => ({
  type: ADD_AUTH_USER,
  payload: { user },
});

export const FETCH_USERS = 'user/FETCH_USERS';
export const fetchUsersAction = () => ({
  type: FETCH_USERS,
});

export const ADD_USERS = 'user/ADD_USERS';
export const addUsersAction = ({ users }) => ({
  type: ADD_USERS,
  payload: { users },
});

export const FETCH_UPDATE_USER = 'user/FETCH_UPDATE_USER';
export const fetchUpdateUserAction = ({ user }) => ({
  type: FETCH_UPDATE_USER,
  payload: { user },
});
