import { takeEvery } from 'redux-saga/effects';

import {
  FETCH_CONVERSATION,
  FETCH_CREATE_CONVERSATION,
  FETCH_CREATE_MESSAGE,
  UPDATE_MESSAGE,
} from './actions';
import {
  onFetchConversations,
  onFetchCreateConversation,
  onFetchCreateMessage,
  onUpdateMessage,
} from './effects';

export function* fetchFeedSaga() {
  yield takeEvery(FETCH_CONVERSATION, onFetchConversations);
}

export function* fetchCreateConversationSaga() {
  yield takeEvery(FETCH_CREATE_CONVERSATION, onFetchCreateConversation);
}

export function* fetchCreateMessageSaga() {
  yield takeEvery(FETCH_CREATE_MESSAGE, onFetchCreateMessage);
}

export function* updateMessageSaga() {
  yield takeEvery(UPDATE_MESSAGE, onUpdateMessage);
}
