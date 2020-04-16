import { Component, Fragment } from 'react';
import { h } from 'react-hyperscript-helpers';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, head, isEmpty } from 'lodash';
import { replace } from 'connected-react-router';

import {
  Contact,
  ConversationConn,
  getConversationsWithUsers,
  fetchConversationsAction,
  getUsersNotInConversations,
  fetchCreateConversationAction,
  getConversationParticipants,
} from '@woozy/conversations';
import { getTheme } from '@woozy/theme';

import { NewConversationModal } from './new-conversation-modal';

const GlobalContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 25%;
`;

const CenterContainer = styled.div`
  width: 75%;
  background-color: white;
  text-align: center;
  overflow: scroll;
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

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedConversationId: null,
    };
  }

  componentDidMount() {
    const { fetchConversations } = this.props;
    fetchConversations();
    // setInterval(fetchConversations, 500);
  }

  render() {
    const {
      showNewConversationModal,
      usersNotInConversations,
      conversations,
      theme,
      closeModal,
      fetchCreateConversation,
    } = this.props;
    const { selectedConversationId = get(head(conversations), 'id') } = this.state;
    console.log('props from home page:', this.props, 'state from home page:', this.state)
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
        h(LeftContainer, [
          !isEmpty(conversations)
            ? conversations.map(({ id, user = {}, lastMessage = {} }, key) => {
              const { username } = user;
              const { content } = lastMessage;
              return h(Contact, {
                key,
                onClick: () =>
                  this.setState({
                    selectedConversationId: id,
                  }),
                selected: selectedConversationId === id,
                username,
                lastMessage: content,
              });
            })
            : 'No Conversations',
        ]),
        h(CenterContainer, [
          h(ConversationConn, {
            conversationId: this.state.selectedConversationId,
          }),
        ]),
      ]),
    ]);
  }
}

const mapStateToProps = (state) => ({
  conversations: getConversationsWithUsers(state),
  parts: getConversationParticipants(state),
  usersNotInConversations: getUsersNotInConversations(state),
  showNewConversationModal:
    get(state, 'router.location.pathname', '/') === '/new',
  theme: getTheme(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchConversations: () => dispatch(fetchConversationsAction()),
  fetchCreateConversation: (userId) =>
    dispatch(fetchCreateConversationAction({ userId })),
  closeModal: () => dispatch(replace('/')),
});

export const HomePageConn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
