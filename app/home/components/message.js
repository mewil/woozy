import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';

// const SenderTextStyle = styled.div`
//   background-color: cornflowerblue;
//   height: 100%;
//   width: 80%;
//   text-align: left;
// `;
// const SenderMessageWrapper = styled.div`
//   height: 100px;
//   width: 100px;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
// `;

// const RecipientMessageWrapper = styled.div`
//   height: 100px;
//   width: 100px;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
// `;
const RecipientTextStyle = styled.div`
  background-color: GhostWhite;
  height: 100px;
  width: 80%;
  text-align: left;
  word-wrap: breakword;
  padding: 10px;
`;

export class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toAvoidedContact: false, // change this
      loggedID: this.props.loggedID,
      senderID: this.props.senderID,
      recipientID: this.props.recipientID,
      status: this.props.status, // Approved, Pending, Denied
      requestApproval: this.props.requestApproval, // To show approve deny
      timestamp: this.props.timestamp,
      content: this.props.content,
    };
  }

  sendText() {
    // ASSUMPTION -- no distinction between a user who has "Avoided contacts" vs a user who has no "Avoided contacts"
    // ASSUMPTION -- Woozy swaps avoided contact number to friends number
    // Drunk user texting Avoided contact -- status (pending --> approved / denied)
    // Drunk user texting any other contact -- status (approved), but don't show "approved"
    // Drunk user texts redirected to friend --
  }
  render() {
    // if (this.state.toAvoidedContact) {

    // }
    // else {

    // }
    return h(RecipientTextStyle, this.state.content);
  }
}
