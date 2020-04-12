import { Component } from 'react';
import { h, div } from 'react-hyperscript-helpers';
import styled from 'styled-components';

import { Input } from '@woozy/ui';
import { Message } from './message';
import { Headline } from './contact-headline';
/*
    senderID: this.props.senderID,
    recipientID: this.propss.recipientID,
    status: this.props.status, // Approved, Pending, Denied
    requestApproval: this.props.requestApproval, // 
    timestamp: this.props.timestamp,
    content: this.props.content
 */

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const tempMessages = [
  {
    messageID: 100,
    senderID: 1,
    recipientID: 0,
    timestamp: 'NOW',
    content:
      'Hey this message is from not the user and is requesting approval and still pending',
    requestApproval: true,
    status: 'PENDING',
    isUser: false,
  },
  {
    messageID: 200,
    senderID: 1,
    recipientID: 0,
    timestamp: 'NOW',
    content:
      'Hey this message is from not the user and has already been accepted',
    requestApproval: true,
    status: 'APPROVED',
    isUser: false,
  },
  {
    messageID: 300,
    senderID: 1,
    recipientID: 0,
    timestamp: 'NOW',
    content: 'Hey this message is from the current user but still pending',
    requestApproval: true,
    status: 'PENDING',
    isUser: true,
  },
  {
    messageID: 500,
    senderID: 1,
    recipientID: 0,
    timestamp: 'NOW',
    content: 'Hey this message is from the current user and accepted',
    requestApproval: true,
    status: 'APPROVED',
    isUser: true,
  },
  {
    messageID: 400,
    senderID: 1,
    recipientID: 0,
    timestamp: 'NOW',
    content:
      'Hey this message is from not the user and is requesting approval and rejected',
    requestApproval: true,
    status: 'REJECTED',
    isUser: false,
  },
  {
    messageID: 600,
    senderID: 1,
    recipientID: 0,
    timestamp: 'NOW',
    content: 'This is a message to overflow the div to see what happens',
    requestApproval: true,
    status: 'PENDING',
    isUser: false,
  },
  {
    messageID: 700,
    senderID: 1,
    recipientID: 0,
    timestamp: 'NOW',
    content: 'And another',
    requestApproval: true,
    status: 'PENDING',
    isUser: false,
  },
  {
    messageID: 800,
    senderID: 1,
    recipientID: 0,
    timestamp: 'NOW',
    content:
      'Hey this message is not from the user and not requesting approval',
    requestApproval: false,
    status: 'PENDING',
    isUser: false,
  },
];

export class Conversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // This should become props passed in using mapStateToProps. Needs to be replaced.
      selectedContactName: 'Shameek Ray',
      selectedContactID: 1,
      isContactSelected: false,
      isFriendContact: false,
      isAvoidedContact: false,
      isUser: false,
    };
  }

  contactHeadline() {
    return h(Headline, this.state);
  }

  sendNewText() {
    this.state = this.state; // place holder to pass lint test -- replace with logic
    return div([h(Input)]);
  }

  render() {
    return div([
      this.contactHeadline(),
      h(
        Container,
        tempMessages.map((message) =>
          h(Message, { ...message, key: message.messageID }),
        ),
      ),
      this.sendNewText(),
    ]);
  }
}
