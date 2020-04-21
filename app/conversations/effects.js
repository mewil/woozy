import { call, put, select } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';
import { get, filter, includes, map, values, isEmpty } from 'lodash';

import { apiFetch, responseHasError } from '@woozy/fetch';
import { getAuthUserId, getLoggedInUser } from '@woozy/user';
import { getMyConversations } from '@woozy/conversations';

import { addConversationsAction, addMessagesAction } from './actions';
import { replace } from 'connected-react-router';

export function* onFetchConversations() {
  const url = '/api/conversation/';
  const result = yield call(apiFetch, { url });

  if (responseHasError(result)) return;

  const conversations = get(result, 'data', {});

  const extractedConversations = map(
    conversations,
    ({ messages, ...rest }) => rest,
  );

  const newMessages = filter(
    values(map(conversations, ({ messages }) => values(messages))),
    (m) => !isEmpty(m),
  ).flat();
  yield put(
    batchActions([
      addConversationsAction({ conversations: extractedConversations }),
      addMessagesAction({ messages: newMessages }),
    ]),
  );
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
  let trustedFriendConversationId = filter(
    userConversations,
    ({ participantIds }) => includes(participantIds, trustedFriendId),
  );
  trustedFriendConversationId =
    trustedFriendConversationId &&
    Object.values(trustedFriendConversationId).length > 0
      ? Object.values(trustedFriendConversationId)[0].id
      : null;
  // check if avoidingId is the same as toUserId
  const woozyStatus =
    Object.values(avoidingId).length > 0 &&
    Object.values(avoidingId).includes(toUserId)
      ? 'pending'
      : 'not_woozy';

  yield call(apiFetch, {
    url,
    method: 'POST',
    body: {
      content: message,
      conversationId,
      toUserId,
      fromUserId: id,
      woozyStatus,
      trustedFriendConversationId,
    },
  });
}

export function* onUpdateMessage({ payload: { messageId, newStatus } }) {
  const url = `/api/message/${messageId}`;
  yield call(apiFetch, {
    url,
    method: 'PUT',
    body: {
      woozyStatus: newStatus,
    },
  });
}
