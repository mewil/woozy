import { get } from 'lodash';

export const getConversations = (state) => get(state, 'conversations', {});
