import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { Body, BodyFaded } from '@woozy/ui';

const ConversationItemStyle = styled.div`
  background-color: white;
  height: 100px;
  width: 100%;
  outline: solid;
  outline-width: thin;
  outline-color: gray;
  background-color: white;
`;

const SelectedConversationStyle = styled.div`
  background-color: lavender;
  height: 100px;
  width: 100%;
  outline: solid;
  outline-width: thin;
  outline-color: gray;
`;

export class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isContactSelected: false,
      contactName: this.props.contactName,
      lastMessage: this.props.lastMessage,
    };
  }
  componentDidMount() {}

  render() {
    if (this.state.isContactSelected) {
      return h(SelectedConversationStyle, [
        h(Body, this.state.contactName),
        h(BodyFaded, this.state.lastMessage),
      ]);
    }
    return h(
      ConversationItemStyle,
      {
        onClick: () => {
          this.setState({ isContactSelected: !this.state.isContactSelected });
        },
      },
      [h(Body, this.state.contactName), h(BodyFaded, this.state.lastMessage)],
    );
  }
}
