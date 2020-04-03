import { takeEvery } from 'redux-saga/effects';

import { FETCH_CONVERSATION, FETCH_CREATE_CONVERSATION } from './actions';
import { onFetchConversations, onFetchCreateConversation } from './effects';

export function* fetchFeedSaga() {
  yield takeEvery(FETCH_CONVERSATION, onFetchConversations);
}

export function* fetchCreateConversationSaga() {
  yield takeEvery(FETCH_CREATE_CONVERSATION, onFetchCreateConversation);
}
