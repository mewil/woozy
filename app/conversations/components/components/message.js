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
  height: 80px;
  margin: 5px 10px;
  border-radius: 4px;
  // max-width: 80%;
  overflow: scroll;
`;

const Text = styled.div`
  position: relative;
  color: black;
  margin: 8px;
  font-size: 16;
  text-align: left;
  word-wrap: break-word;
`;

const MessageStatus = styled.p`
  color: ${(props) => props.color};
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
        return h(MessageStatus, { color: 'red', }, ['Rejected'])
      }
      if (this.state.status === 'APPROVED') {
        return h(MessageStatus, { color: 'green', }, ['Approved'])
      }
      if (this.state.status === 'PENDING') {
        return h(MessageStatus, { color: 'yellow', }, ['Pending'])
      }
    }
  }

  render() {
    return h(Container,
      {
        style: this.state.isUser
          ? {
            alignSelf: 'flex-end',
            backgroundColor: '#404040',
          }
          : {
            alignSelf: 'flex-start',
            backgroundColor: '#F0F2F7',
          },
      },
      [h(Text, [
        this.state.content,
        !this.state.isUser && this.state.requestApproval && this.state.status === 'PENDING' ?
          h(div, [
            h(Button, {
              style: { backgroundColor: 'green', },
              onClick: () => this.updateMessageStatus('APPROVED'),
            },
              ['Approve']),
            h(Button, {
              style: { backgroundColor: 'red', },
              onClick: () => this.updateMessageStatus('REJECTED'),
            }, ['Deny'])])
          : this.renderMessageStatus(),
      ])]
    );
  }
}
