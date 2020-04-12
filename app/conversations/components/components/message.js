import { Component } from 'react';
import { h, div } from 'react-hyperscript-helpers';
import styled from 'styled-components';

import { Button } from '@woozy/ui';


// const ContainerContainer = styled.div`
//   display: flex;
//   width: 100%;
// `;

const Container = styled.div`
  flex-direction: row;
  margin: 5px 10px;
  border-radius: 4px;
  max-width: 80%;
`;

const Text = styled.div`
  position: relative;
  color: black;
  margin: 8px;
  text-align: left;
  word-wrap: break-word;
`;

const MessageStatus = styled.p`
  color: #444;
  font-size: 12px;
`;

export class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props
    };
  }

  updateMessageStatus(newStatus) {
    this.setState({ status: newStatus })
  }

  renderMessageStatus() {
    if (this.state.requestApproval) {
      if (this.state.status === 'REJECTED') {
        return h(MessageStatus, ['Rejected'])
      }
      if (this.state.status === 'APPROVED') {
        return h(MessageStatus, ['Approved'])
      }
      if (this.state.status === 'PENDING') {
        return h(MessageStatus, ['Pending'])
      }
    }
  }

  render() {
    let backgroundColor = '#EEE';
    if (this.state.isUser) {
      if (!this.state.requestApproval || this.state.status === 'APPROVED') {
        backgroundColor = 'lightgreen';
      }
      else if (this.state.status === 'PENDING') {
        backgroundColor = 'lightgoldenrodyellow';
      }
      else if (this.state.status === 'REJECTED') {
        backgroundColor = '#db4054';
      }
    }
    return h(Container,
      {
        style: this.state.isUser
          ? {
            alignSelf: 'flex-end',
            backgroundColor: backgroundColor,
          }
          : {
            alignSelf: 'flex-start',
            backgroundColor: backgroundColor,
          },
      },
      [h(Text, [
        this.state.content,
        !this.state.isUser && this.state.requestApproval && this.state.status === 'PENDING' ?
          h(div, [
            h(Button, {
              style: { backgroundColor: 'lightgreen', borderColor: '#888', marginRight: '5px', marginTop: '5px', },
              onClick: () => this.updateMessageStatus('APPROVED'),
            },
              ['Approve']),
            h(Button, {
              style: { backgroundColor: '#db4054', borderColor: '#888', marginRight: '5px', marginTop: '5px', },
              onClick: () => this.updateMessageStatus('REJECTED'),
            }, ['Deny'])])
          : this.renderMessageStatus(),
      ])]
    );
  }
}
