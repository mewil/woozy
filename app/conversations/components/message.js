import { Component } from 'react';
import { h, div } from 'react-hyperscript-helpers';
import styled from 'styled-components';

import { Button } from '@woozy/ui';

import { WOOZY_STATES } from '../constants';

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
  font-size: 11px;
  margin: 4px 0px;
`;

export class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
    };
  }

  updateMessageStatus(newStatus) {
    this.setState({ status: newStatus });
  }

  renderMessageStatus() {
    if (this.props.requestApproval) {
      return h(MessageStatus, [WOOZY_STATES[this.props.status]]);
    }
    return null;
  }

  render() {
    let backgroundColor = '#EEE';
    if (this.props.isUser) {
      if (!this.props.requestApproval || this.state.status === 'APPROVED') {
        backgroundColor = 'lightgreen';
      } else if (this.state.status === 'PENDING') {
        backgroundColor = 'lightgoldenrodyellow';
      } else if (this.state.status === 'REJECTED') {
        backgroundColor = '#db4054';
      }
    }
    return h(
      Container,
      {
        style: this.props.isUser
          ? {
            alignSelf: 'flex-end',
            backgroundColor: backgroundColor,
          }
          : {
            alignSelf: 'flex-start',
            backgroundColor: backgroundColor,
          },
      },
      [
        h(Text, [
          this.props.content,
          !this.props.isUser &&
            this.props.requestApproval &&
            this.state.status === 'PENDING'
            ? h(div, [
              h(
                Button,
                {
                  style: {
                    backgroundColor: 'lightgreen',
                    borderColor: '#888',
                    marginRight: '5px',
                    marginTop: '5px',
                  },
                  onClick: () => this.updateMessageStatus('APPROVED'),
                },
                ['Approve'],
              ),
              h(
                Button,
                {
                  style: {
                    backgroundColor: '#db4054',
                    borderColor: '#888',
                    marginRight: '5px',
                    marginTop: '5px',
                  },
                  onClick: () => this.updateMessageStatus('REJECTED'),
                },
                ['Deny'],
              ),
            ])
            : this.renderMessageStatus(),
        ]),
      ],
    );
  }
}
