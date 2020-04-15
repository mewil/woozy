import { takeEvery } from 'redux-saga/effects';

import { FETCH_USERS, FETCH_LOGIN_USER, FETCH_UPDATE_USER } from './actions';
import { onFetchUsers, onFetchLoginUser, onFetchUpdateUser } from './effects';

export function* fetchUserSaga() {
  yield takeEvery(FETCH_USERS, onFetchUsers);
}

export function* fetchLoginUserSaga() {
  yield takeEvery(FETCH_LOGIN_USER, onFetchLoginUser);
}

export function* fetchUpdateUserSaga() {
  yield takeEvery(FETCH_UPDATE_USER, onFetchUpdateUser);
}
