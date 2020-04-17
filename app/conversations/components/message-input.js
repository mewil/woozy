import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { Component } from 'react';
import { connect } from 'react-redux';

import { Input, Button } from '@woozy/ui';
import { fetchCreateMessageAction } from '../actions';

const Container = styled.div`
  display: flex;
  z-index: 10;
  flex-direction: row;
  box-shadow: 1px 2px 4px lightgray;
  background-color: white;
  width: 75%;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 8px;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  width: 75%;
  > {
    width: 100%;
  }
  input {
    width: 100%;
  }
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
    return h(Container, [
      h(InputContainer, [
        h(Input, {
          onChange: (event) => this.onMessageType(event),
          onKeyPress: (event) => this.handleOnKeyPress(event),
          value: content,
          type: 'text',
          placeholder: 'Type a message...',
        }),
      ]),
      h(
        Button,
        {
          hollow: content === '',
          onClick: () => this.sendMessage(),
          style: {
            height: '48px',
          },
        },
        'Send',
      ),
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
