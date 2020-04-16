import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Message } from './message';
import { fetchMessagesAction } from '../actions';

const ConversationContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding: 8px;
`;

export class Conversation extends Component {
  componentDidMount() {
    const { fetchMessages } = this.props;
    fetchMessages();
    this.interval = setInterval(fetchMessages, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { messages = [] } = this.props;
    return h(ConversationContainer, [
      messages.map((message, key) => h(Message, { ...message, key })),
    ]);
  }
}

const mapDispatchToProps = (dispatch, { id }) => ({
  fetchMessages: () => dispatch(fetchMessagesAction({ conversationId: id })),
});

export const ConversationConn = connect(null, mapDispatchToProps)(Conversation);
