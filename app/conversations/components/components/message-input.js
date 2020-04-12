import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { Component } from 'react';
import { Input, Button } from '@woozy/ui';

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
    super(props);
    this.state = {
      value: '',
    };
  }

  onMessageSend(event) {
    this.setState({ value: '' });
    event.preventDefault();
  }

  onMessageType(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return h(MessageInputWrapper, [
      h(InputWrapper, [
        h(Input, {
          onChange: (event) => this.onMessageType(event),
          value: this.state.value,
          type: 'text',
        }),
      ]),
      h(ButtonWrapper, [
        h(Button, { onClick: (event) => this.onMessageSend(event) }, 'Send'),
      ]),
    ]);
    // return div("Hello");
  }
}
