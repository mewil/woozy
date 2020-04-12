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

export const ADD_MESSAGE = 'messages/ADD_MESSAGE';

export const addMessage = ({ message }) => ({
  type: ADD_MESSAGE,
  payload: { message }
});
