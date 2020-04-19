import { call, put, select } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';
import { get, filter, includes } from 'lodash';

import { apiFetch, responseHasError } from '@woozy/fetch';
import { getAuthUserId, getLoggedInUser } from '@woozy/user';
import { getMyConversations } from '@woozy/conversations';

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
  payload: { message, conversationId, toUserId },
}) {
  const url = '/api/message/';
  const { id, avoidingId, trustedFriendId } = yield select(getLoggedInUser);
  // get conversationId with trusted friend
  const userConversations = yield select(getMyConversations);
  // let trustedFriendConversationId = filter(conversations, ({ participantIds }) =>
  //   includes(participantIds, id) && includes(participantIds, trustedFriendId),
  // )
  let trustedFriendConversationId = filter(userConversations, ({ participantIds }) => includes(participantIds, trustedFriendId))
  trustedFriendConversationId = trustedFriendConversationId && Object.values(trustedFriendConversationId).length > 0 ? Object.values(trustedFriendConversationId)[0].id : null;

  const result = yield call(apiFetch, {
    url,
    method: 'POST',
    body: {
      content: message,
      conversationId,
      toUserId,
      fromUserId: id,
      woozyStatus: Object.values(avoidingId).length > 0 ? 'pending' : 'not_woozy',
      trustedFriendConversationId,
    },
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

export function* onUpdateMessage({ payload: { messageId, newStatus } }) {
  const url = `/api/message/${messageId}`;
  yield call(apiFetch, {
    url,
    method: 'PUT',
    body: {
      woozyStatus: newStatus,
    }
  });
}
