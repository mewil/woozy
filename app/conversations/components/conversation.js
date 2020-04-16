import { Component } from 'react';
import { h, div } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Message } from './message';
import { Headline } from './contact-headline';
import { MessageInputConn } from './message-input';
import { getMessages } from '../selectors';
import { fetchMessagesAction } from '../actions';

const ConversationContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

export class Conversation extends Component {
  componentDidMount() {
    const { fetchMessages } = this.props;
    fetchMessages();
    setInterval(fetchMessages, 500);
  }

  render() {
    const messages = Object.values(this.props.messages).sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
    return div([
      h(Headline, this.props),
      messages.length > 0
        ? h(
            ConversationContainer,
            messages.map((message, key) => h(Message, { ...message, key })),
          )
        : null,
      h(MessageInputConn, {
        conversationId: this.props.conversationId,
      }),
    ]);
  }
}

const mapStateToProps = (state) => ({
  messages: getMessages(state),
});

const mapDispatchToProps = (dispatch, { conversationId }) => ({
  fetchMessages: () => dispatch(fetchMessagesAction({ conversationId })),
});

export const ConversationConn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Conversation);
