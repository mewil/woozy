export const FETCH_CONVERSATION = 'conversations/FETCH_CONVERSATION';
export const fetchConversationsAction = () => ({
  type: FETCH_CONVERSATION,
});

export const FETCH_CREATE_CONVERSATION =
  'conversations/FETCH_CREATE_CONVERSATION';
export const fetchCreateConversationAction = ({ userId }) => ({
  type: FETCH_CREATE_CONVERSATION,
  payload: { userId },
});

export const ADD_CONVERSATIONS = 'conversations/ADD_CONVERSATIONS';
export const addConversationsAction = ({ conversations }) => ({
  type: ADD_CONVERSATIONS,
  payload: { conversations },
});

export const FETCH_CREATE_MESSAGE = 'conversations/FETCH_CREATE_MESSAGE';
export const fetchCreateMessageAction = ({
  message,
  conversationId,
  toUserId,
}) => ({
  type: FETCH_CREATE_MESSAGE,
  payload: { message, conversationId, toUserId },
});

export const ADD_MESSAGES = 'conversations/ADD_MESSAGES';
export const addMessagesAction = ({ messages }) => ({
  type: ADD_MESSAGES,
  payload: { messages },
});

export const UPDATE_MESSAGE = 'conversations/UPDATE_MESSAGE';
export const updateWoozyStatusAction = ({ messageId, newStatus }) => ({
  type: UPDATE_MESSAGE,
  payload: { messageId, newStatus },
});
