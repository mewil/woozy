import { call, put } from 'redux-saga/effects';
import { get } from 'lodash';

import { apiFetch, responseHasError } from '@woozy/fetch';

import { addUserAction } from './actions';

export function* onFetchUser({ payload: { userId } }) {
  const url = `/v1/user/${userId}`;
  const result = yield call(apiFetch, { url });

  if (responseHasError(result)) {
    return;
  }

  const user = get(result, 'data.user', {});

  yield put(addUserAction({ user }));
}
