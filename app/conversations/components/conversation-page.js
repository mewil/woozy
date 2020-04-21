import { Component, Fragment } from 'react';
import { h } from 'react-hyperscript-helpers';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, head, isEmpty } from 'lodash';
import { replace } from 'connected-react-router';

import { getTheme } from '@woozy/theme';
import {
  getIsFriendContact,
  getIsAvoidedContact,
  getAuthUserId,
  fetchUsersAction,
} from '@woozy/user';

import { ConversationList } from './conversation-list';
import { ConversationConn } from './conversation';
import { Headline } from './contact-headline';
import { MessageInputConn } from './message-input';
import { NewConversationModal } from './new-conversation-modal';
import {
  getConversationsWithUserAndMessages,
  getUsersNotInConversations,
} from '../selectors';
import {
  fetchConversationsAction,
  fetchCreateConversationAction,
} from '../actions';

const GlobalContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: ${({ hasConversations }) =>
    hasConversations ? 'flex-start' : 'center'};
  flex-direction: column;
  width: 25%;
  box-shadow: 1px 2px 4px lightgray;
  z-index: 80;
`;

const CenterContainer = styled.div`
  width: 75%;
  text-align: center;
  overflow: scroll;
`;

const NoConversationContainer = styled.div`
  padding-top: 40px;
`;

const ModalOverlay = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  background: #ffffff55;
`;

export class ConversationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversationId: undefined,
    };
  }

  componentDidMount() {
    const { fetchConversations, fetchUsers } = this.props;
    fetchConversations();
    this.interval = setInterval(fetchConversations, 1000);
    fetchUsers();
    this.interval = setInterval(fetchUsers, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setConversationId(id) {
    this.setState({
      conversationId: id,
    });
  }

  render() {
    const {
      showNewConversationModal,
      usersNotInConversations,
      conversations,
      theme,
      closeModal,
      fetchCreateConversation,
      isFriendContact,
      isAvoidedContact,
      authId,
    } = this.props;
    const {
      conversationId = get(head(Object.values(conversations)), 'id', null),
    } = this.state;
    const currentConversation = get(conversations, conversationId);
    return h(Fragment, [
      h(ModalOverlay, { open: showNewConversationModal }, [
        h(NewConversationModal, {
          closeModal,
          fetchCreateConversation,
          theme,
          users: usersNotInConversations,
          addCommand: (c) => this.addCommand(c),
        }),
      ]),
      h(GlobalContainer, [
        h(LeftContainer, { hasConversations: !isEmpty(conversations) }, [
          !isEmpty(conversations)
            ? h(ConversationList, {
                authId,
                conversations,
                conversationId,
                setConversationId: (id) => this.setConversationId(id),
              })
            : h(NoConversationContainer, ['No Conversations']),
        ]),
        h(CenterContainer, [
          h(Headline, {
            username: get(currentConversation, 'user.username', ''),
            isFriendContact,
            isAvoidedContact,
          }),
          conversationId
            ? h(ConversationConn, {
                ...currentConversation,
              })
            : null,
          h(MessageInputConn, {
            ...currentConversation,
          }),
        ]),
      ]),
    ]);
  }
}

const mapStateToProps = (state) => ({
  conversations: getConversationsWithUserAndMessages(state),
  usersNotInConversations: getUsersNotInConversations(state),
  showNewConversationModal:
    get(state, 'router.location.pathname', '/') === '/new',
  theme: getTheme(state),
  isFriendContact: getIsFriendContact(state),
  isAvoidedContact: getIsAvoidedContact(state),
  authId: getAuthUserId(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchConversations: () => dispatch(fetchConversationsAction()),
  fetchUsers: () => dispatch(fetchUsersAction()),
  fetchCreateConversation: (userId) =>
    dispatch(fetchCreateConversationAction({ userId })),
  closeModal: () => dispatch(replace('/')),
});

export const ConversationPageConn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConversationPage);
