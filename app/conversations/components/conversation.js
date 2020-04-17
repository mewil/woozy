import { Component } from 'react';
import { h, div } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getAuthUserId } from '@woozy/user';

import { Message } from './message';
import { fetchMessagesAction } from '../actions';

const ConversationContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding: 12px;
  margin: 70px 0px;
`;

export class Conversation extends Component {
  componentDidMount() {
    this.startUpdateInterval();
    this.bottom.scrollIntoView();
  }

  componentWillUnmount() {
    this.stopUpdateInterval();
  }

  componentDidUpdate({ id: prevId }) {
    const { id } = this.props;
    if (prevId !== id) {
      this.stopUpdateInterval();
      this.startUpdateInterval();
      this.bottom.scrollIntoView();
    }
  }

  startUpdateInterval() {
    const { fetchMessages } = this.props;
    fetchMessages();
    this.interval = setInterval(fetchMessages, 1000);
  }

  stopUpdateInterval() {
    clearInterval(this.interval);
  }

  render() {
    const { messages = [], loggedInUserId } = this.props;
    return h(ConversationContainer, [
      div({
        ref: (bottom) => {
          this.bottom = bottom;
        },
      }),
      messages.map((message, key) =>
        h(Message, {
          ...message,
          key,
          isUser: loggedInUserId === message.fromUserId,
        }),
      ),
    ]);
  }
}

const mapStateToProps = (state) => ({
  loggedInUserId: getAuthUserId(state),
});

const mapDispatchToProps = (dispatch, { id }) => ({
  fetchMessages: () => dispatch(fetchMessagesAction({ conversationId: id })),
});

export const ConversationConn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Conversation);
