import { Component } from 'react';
import { h, div } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  getAuthUserId,
  getIsAvoidedContact,
  getUserIdsToUsernames,
} from '@woozy/user';

import { Message } from './message';
import { fetchMessagesAction, updateWoozyStatusAction } from '../actions';

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
    const {
      messages = [],
      loggedInUserId,
      user,
      isAvoided,
      updateWoozyStatus,
      usernameMap,
    } = this.props;
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
          isFromUser: loggedInUserId === message.fromUserId,
          loggedInUserId,
          // just pass the whole other user idk
          otherUser: user,
          // if the logged in user is the trusted friend for otherUser
          isTrusted: user.trustedFriendId === loggedInUserId,
          // if the logged in user is avoiding the other user
          isAvoided,
          updateWoozyStatus,
          fromUsername: usernameMap[message.fromUserId],
          toUsername: usernameMap[message.toUserId],
        }),
      ),
    ]);
  }
}

const mapStateToProps = (state, { user = { id: null } }) => ({
  loggedInUserId: getAuthUserId(state),
  isAvoided: getIsAvoidedContact(state, user.id),
  usernameMap: getUserIdsToUsernames(state),
});

const mapDispatchToProps = (dispatch, { id }) => ({
  fetchMessages: () => dispatch(fetchMessagesAction({ conversationId: id })),
  updateWoozyStatus: (messageId, newStatus) =>
    dispatch(updateWoozyStatusAction({ messageId, newStatus })),
});

export const ConversationConn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Conversation);
