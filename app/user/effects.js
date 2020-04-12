import { call, put } from 'redux-saga/effects';
import { get } from 'lodash';
import { replace } from 'connected-react-router';
import { batchActions } from 'redux-batched-actions';

import { apiFetch, responseHasError } from '@woozy/fetch';

import { addUsersAction, addAuthUserAction } from './actions';

export function* onFetchUser({ payload: { userId } }) {
  const url = `/v1/user/${userId}`;
  const result = yield call(apiFetch, { url });

  if (responseHasError(result)) {
    return;
  }

  const user = get(result, 'data.user', {});

  yield put(addUsersAction({ user }));
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
  yield put(batchActions([addAuthUserAction({ user }), replace('/')]));
}
