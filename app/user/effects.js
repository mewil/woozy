import { call, put } from 'redux-saga/effects';
import { get } from 'lodash';
import { replace } from 'connected-react-router';
import { batchActions } from 'redux-batched-actions';

import { apiFetch, responseHasError } from '@woozy/fetch';

import { addUsersAction, addAuthUserAction, fetchUsersAction } from './actions';

export function* onFetchUsers() {
  const result = yield call(apiFetch, { url: '/api/user/' });

  if (responseHasError(result)) {
    return;
  }

  const users = get(result, 'data', {});
  yield put(addUsersAction({ users }));
}

export function* onFetchLoginUser({ payload: { username } }) {
  const result = yield call(apiFetch, {
    method: 'POST',
    url: '/api/user/',
    body: {
      username,
    },
  });

  if (responseHasError(result)) {
    return;
  }

  const user = get(result, 'data', {});
  yield put(
    batchActions([
      fetchUsersAction(),
      addAuthUserAction({ user }),
      replace('/'),
    ]),
  );
}

export function* onFetchUpdateUser({ payload: { user } }) {
  const { id } = user;
  const url = `/api/user/${id}`;
  const result = yield call(apiFetch, {
    method: 'PUT',
    url,
    body: {
      ...user,
    },
  });

  if (responseHasError(result)) {
    return;
  }

  yield put(fetchUsersAction());
}
