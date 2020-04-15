import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { Component } from 'react';
import { connect } from 'react-redux';
const mongoose = require('mongoose');



import { Input, Button } from '@woozy/ui';
import { fetchCreateMessageAction } from '../actions';

const MessageInputWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
`;
const InputWrapper = styled.div`
  width: 80%;
  align-items: flex-end;
`;

const ButtonWrapper = styled.div`
  width: 20%;
`;

export class MessageInput extends Component {
  constructor(props) {
    console.log('message input props', props)
    super(props);
    this.state = {
      value: '',
    };
  }

  onMessageSend(event) {
    // POST this message
    const { sendMessage } = this.props;
    sendMessage(this.state.value);
    event.preventDefault();
    this.setState({ value: '' });
  }

  onMessageType(event) {
    this.setState({ value: event.target.value });
  }

  handleOnKeyPress(event) {
    if (event.key === 'Enter') {
      // POST this message
      const { sendMessage } = this.props;
      sendMessage(this.state.value);
      event.preventDefault();
      this.setState({ value: '' });
    }
  }

  render() {
    return h(MessageInputWrapper, [
      h(InputWrapper, [
        h(Input, {
          onChange: (event) => this.onMessageType(event),
          onKeyPress: (event) => this.handleOnKeyPress(event),
          value: this.state.value,
          type: 'text',
        }),
      ]),
      h(ButtonWrapper, [
        h(
          Button,
          {
            onClick: (event) => this.onMessageSend(event),
          },
          'Send',
        ),
      ]),
    ]);
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (message) =>
    dispatch(
      fetchCreateMessageAction({
        message,
        conversationId: mongoose.Types.ObjectId(4),
      }),
    ),
});

export const MessageInputConn = connect(null, mapDispatchToProps)(MessageInput);
