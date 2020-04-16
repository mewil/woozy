import { Component } from 'react';
import { h, div } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Message } from './message';
import { Headline } from './contact-headline';
import { MessageInputConn } from './message-input';
import { getRenderedMessages } from '../selectors';

/*
    senderID: this.props.senderID,
    recipientID: this.propss.recipientID,
    status: this.props.status, // Approved, Pending, Denied
    requestApproval: this.props.requestApproval, // 
    timestamp: this.props.timestamp,
    content: this.props.content
 */

const ConversationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export class Conversation extends Component {
  render() {
    console.log('conversation props', this.props)
    const messages = Object.values(this.props.messages)
    return div([
      h(Headline, this.props),
      messages.length > 0 ?
        h(
          ConversationContainer,
          messages.map((message) =>
            h(Message, { ...message, key: message.messageID }),
          ) ,
        )
        : null,
      h(MessageInputConn, {
        conversationId: this.props.conversationId,
      }),
    ]);
  }
}

const mapStateToProps = (state, ownProps) => ({
  messages: getRenderedMessages(state, ownProps.conversationId),
});

export const ConversationConn = connect(mapStateToProps, null)(Conversation);