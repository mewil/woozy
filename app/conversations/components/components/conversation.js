import { Component } from 'react';
import { h, div } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { Message } from './message';
import { Headline } from './contact-headline';
import { MessageInput } from './message-input';

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
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const tempMessages = [
  {
    messageID: 100,
    senderID: 1,
    recipientID: 0,
    timestamp: 'NOW',
    content: 'Hey this is my first text.',
    requestApproval: false,
    status: 'APPROVED',
    isUser: false,
  },
  {
    messageID: 200,
    senderID: 1,
    recipientID: 0,
    timestamp: 'NOW',
    content: 'Hey this is my second text.',
    requestApproval: true,
    status: 'PENDING',
    isUser: false,
  },
];

export class Conversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // This should become props passed in using mapStateToProps. Needs to be replaced.
      // contactName: this.props.contactName,
      // contactID: this.props.contactName,
      // isFriendContact: false,
      // isAvoidedContact: false,
      // isUser: false,
      messages: tempMessages,
    };
  }

  render() {
    return h(ConversationContainer, [
      h(Headline, this.props),
      div(
        this.state.messages.map((message) =>
          h(Message, { ...message, key: message.messageID }),
        ),
      ),
      h(MessageInput),
    ]);
  }
}
