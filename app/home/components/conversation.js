import { Component } from 'react';
import { h, div, li, ul } from 'react-hyperscript-helpers';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Title, Body, BodyFaded, TextFaded } from 'app/ui/typography.js';
import { Input } from 'app/ui/input.js';
import { Button } from 'app/ui/button.js';
import { Message } from './message';


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
        senderID: 1,
        recipientID:0,
        timestamp: "NOW",
        content: "Hey this is my first text.",
        requestApproval: false,
        status: "APPROVED"
    },
    {
      senderID: 1,
      recipientID:0,
      timestamp: "NOW",
      content: "Hey this is my second text.",
      requestApproval: true,
      status: "PENDING"
  }
]

const ConversationHeaderWrapper = styled.div`
  width: 100%;
  height: 80px;
  background-color: 
  outline: solid;
  outline-width: thin;
  outline-color: gray;
`;

 export class Conversation extends Component { 
    constructor(props) {
      super(props);
  
      this.state = {
        // contactName = this.props.contactName ? this.props.contactName === true : "Shameek Ray" 
        selectedContactName: "Shameek Ray",
        selectedContactID: 1,
        isContactSelected: false,
        isFriendContact: false,
        isAvoidedContact: false
      }
    }
  
    contactHeadline() {
      return (
        h(ConversationHeaderWrapper, [
          h(Body, this.state.contactName ? this.isContactSelected == true : "Choose a contact to see their messages."),
          h(div, this.contactStatus())
        ])
      );
    }

  
    contactStatus() {
      if (this.state.isFriendContact) return "Woozy Friend"
      else if (this.state.isAvoidedContact) return "Avoiding"
      else return ""
    }

    sendNewText() {
      return (
        h(div, [
          h(Input)]    
        )
      );
    }

    showMessages() {
        return (
            h(div, tempMessages.map(
                message => h(Message, message)
            ))
        );
    }

    render() {
      return (
        h(div, [
          this.contactHeadline(),
          this.showMessages(),
          this.sendNewText()
        ])
      );
    }
  }