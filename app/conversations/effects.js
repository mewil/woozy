import { call, put } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';
import { get } from 'lodash';

import { apiFetch, responseHasError } from '@woozy/fetch';

import { addConversationsAction } from './actions';
import { replace } from 'connected-react-router';

export function* onFetchConversations() {
  const url = '/v1/conversation/';
  const result = yield call(apiFetch, { url });

  if (responseHasError(result)) return;

  const conversations = get(result, 'data.feed', []);
  yield put(batchActions([addConversationsAction({ conversations })]));
}

export function* onFetchCreateConversation() {
  const url = '/v1/conversation/';
  const result = yield call(apiFetch, {
    url,
    method: 'POST',
    form: true,
    body: {},
  });

  if (responseHasError(result)) return;

  const conversation = get(result, 'data.conversation', {});
  yield put(
    batchActions([
      addConversationsAction({ conversations: [conversation] }),
      replace('/'),
    ]),
  );
}
