import { get } from 'lodash';

export const getConversations = (state) => get(state, 'conversations', {});
export const getMessages = (state) => get(state, 'messages', {});
