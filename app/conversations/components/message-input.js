import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { Component } from 'react';
import { connect } from 'react-redux';

import { Input, Button } from '@woozy/ui';
import { fetchCreateMessageAction } from '../actions';

const MessageInputWrapper = styled.div`
  display: flex;
  width: 100%;
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
    super(props);
    this.state = {
      content: '',
    };
  }

  sendMessage() {
    const { sendMessage } = this.props;
    const { content } = this.state;
    if (content !== '') {
      sendMessage(content);
      this.setState({ content: '' });
    }
  }

  onMessageType(event) {
    this.setState({ content: event.target.value });
  }

  handleOnKeyPress(event) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  render() {
    const { content } = this.state;
    return h(MessageInputWrapper, [
      h(InputWrapper, [
        h(Input, {
          onChange: (event) => this.onMessageType(event),
          onKeyPress: (event) => this.handleOnKeyPress(event),
          value: content,
          type: 'text',
        }),
      ]),
      h(ButtonWrapper, [
        h(
          Button,
          {
            hollow: content === '',
            onClick: () => this.sendMessage(),
          },
          'Send',
        ),
      ]),
    ]);
  }
}

const mapDispatchToProps = (dispatch, { id, user }) => ({
  sendMessage: (message) =>
    dispatch(
      fetchCreateMessageAction({
        message,
        conversationId: id,
        toUserId: user.id,
      }),
    ),
});

export const MessageInputConn = connect(null, mapDispatchToProps)(MessageInput);
