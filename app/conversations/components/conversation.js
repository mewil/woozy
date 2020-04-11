import { Component } from 'react';
import { h, div } from 'react-hyperscript-helpers';

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

  showMessages() {
    this.state = this.state; // place holder to pass lint test -- replace with logic
    return h(
      div,
      tempMessages.map((message) =>
        h(Message, { ...message, key: message.messageID }),
      ),
    );
  }

  render() {
    return div([
      this.contactHeadline(),
      this.showMessages(),
      this.sendNewText(),
    ]);
  }
}
