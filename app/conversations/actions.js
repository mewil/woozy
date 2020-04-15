export const FETCH_CONVERSATION = 'conversations/FETCH_CONVERSATION';
export const fetchConversationsAction = () => ({
  type: FETCH_CONVERSATION,
});

export const FETCH_CREATE_CONVERSATION =
  'conversations/FETCH_CREATE_CONVERSATION';
export const fetchCreateConversationAction = ({
  caption,
  imageUrl,
  imageType,
}) => ({
  type: FETCH_CREATE_CONVERSATION,
  payload: { caption, imageUrl, imageType },
});

export const ADD_CONVERSATIONS = 'conversations/ADD_CONVERSATIONS';
export const addConversationsAction = ({ conversations }) => ({
  type: ADD_CONVERSATIONS,
  payload: { conversations },
});

export const FETCH_CREATE_MESSAGE = 'conversations/FETCH_CREATE_MESSAGE';
export const fetchCreateMessageAction = ({ message, conversationId }) => ({
  type: FETCH_CREATE_MESSAGE,
  payload: { message, conversationId },
});

export const FETCH_MESSAGES = 'conversations/FETCH_MESSAGES';
export const fetchMessagesAction = ({ conversationId }) => ({
  type: FETCH_MESSAGES,
  payload: { conversationId },
});

export const ADD_MESSAGES = 'conversations/ADD_MESSAGES';
export const addMessagesAction = ({ messages }) => ({
  type: ADD_MESSAGES,
  payload: { messages },
});
