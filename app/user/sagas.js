import { takeEvery } from 'redux-saga/effects';

import { FETCH_USER, FETCH_LOGIN_USER } from './actions';
import { onFetchUser, onFetchLoginUser } from './effects';

export function* fetchUserSaga() {
  yield takeEvery(FETCH_USER, onFetchUser);
}

export function* fetchLoginUserSaga() {
  yield takeEvery(FETCH_LOGIN_USER, onFetchLoginUser);
}
