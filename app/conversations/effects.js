import { call, put } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';
import { get } from 'lodash';

import { apiFetch, responseHasError } from '@woozy/fetch';

import { addConversationsAction, fetchMessagesAction, addMessagesAction } from './actions';
import { replace } from 'connected-react-router';

export function* onFetchConversations() {
  const url = '/api/conversation/';
  const result = yield call(apiFetch, { url });

  if (responseHasError(result)) return;

  const conversations = get(result, 'data.feed', []);
  yield put(batchActions([addConversationsAction({ conversations })]));
}

export function* onFetchCreateConversation() {
  const url = '/api/conversation/';
  const result = yield call(apiFetch, {
    url,
    method: 'POST',
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

export function* onFetchCreateMessage({ payload: { message, conversationId } }) {
  const url = '/api/message/send/';
  const result = yield call(apiFetch, {
    url,
    method: 'POST',
    body: { content: message, conversationId },
  });

  if (responseHasError(result)) return;
  // const message = get(result, 'data.message', {});
  yield put(
    fetchMessagesAction({ conversationId })
  );
}

export function* onFetchMessages({ payload: { conversationId } }) {
  const url = '/api/message/all-messages/';
  const result = yield call(apiFetch, {
    url,
    method: 'GET',
  });

  if (responseHasError(result)) return;
  console.log('result from effect', result, 'payload from effect', conversationId)
  const messages = get(result, 'data', {});
  yield put(
    addMessagesAction({ messages })
  );
}
// messageId: mongoose.Schema.Types.ObjectId,
//   conversationId: mongoose.Schema.Types.ObjectId,
//   content: String,
//   timestamp: Date,
//   fromUserId: mongoose.Schema.Types.ObjectId,
//   toUserId: mongoose.Schema.Types.ObjectId,
//   woozyApproved: {
//     type: String,
//     enum: Object.values(WOOZY_MESSAGE_STATUS),
//     default: WOOZY_MESSAGE_STATUS.NOT_WOOZY,
//   },