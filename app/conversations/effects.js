import { call, put, select } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';
import { get } from 'lodash';

import { apiFetch, responseHasError } from '@woozy/fetch';
import { getAuthUserId } from '@woozy/user';

import {
  addConversationsAction,
  fetchMessagesAction,
  addMessagesAction,
} from './actions';
import { replace } from 'connected-react-router';

export function* onFetchConversations() {
  const url = '/api/conversation/';
  const result = yield call(apiFetch, { url });

  if (responseHasError(result)) return;

  const conversations = get(result, 'data', []);
  yield put(batchActions([addConversationsAction({ conversations })]));
}

export function* onFetchCreateConversation({ payload: { userId } }) {
  const authUserId = yield select(getAuthUserId);
  const url = '/api/conversation/';
  const result = yield call(apiFetch, {
    url,
    method: 'POST',
    body: { participantIds: [userId, authUserId] },
  });

  if (responseHasError(result)) return;

  const conversation = get(result, 'data', {});
  yield put(
    batchActions([
      addConversationsAction({ conversations: [conversation] }),
      replace('/'),
    ]),
  );
}

export function* onFetchCreateMessage({
  payload: { message, conversationId },
}) {
  const url = '/api/message/';
  const result = yield call(apiFetch, {
    url,
    method: 'POST',
    body: { content: message, conversationId },
  });

  if (responseHasError(result)) return;
  yield put(fetchMessagesAction({ conversationId }));
}

export function* onFetchMessages({ payload: { conversationId } }) {
  const url = `/api/message/${conversationId}`;
  const result = yield call(apiFetch, {
    url,
    method: 'GET',
  });

  if (responseHasError(result)) return;
  const messages = get(result, 'data', {});
  yield put(addMessagesAction({ messages }));
}
