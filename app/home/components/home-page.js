import { Component, Fragment } from 'react';
import { h } from 'react-hyperscript-helpers';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, head, isEmpty } from 'lodash';
import { replace } from 'connected-react-router';

import {
  Contact,
  Conversation,
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
    if (conversationList.length > 0) {
      this.state = {
        hasContacts: true,
        selectedContactID: conversationList[0].contactId,
        selectedContactName: conversationList[0].contactName,
      };
    } else {
      this.state = {
        hasContacts: false,
      };
    }
  }

  componentDidMount() {
    const { fetchConversations } = this.props;
    fetchConversations();
  }

  onContactClick(newSelectedID, newSelectedContactName) {
    this.setState({
      selectedContactID: newSelectedID,
      selectedContactName: newSelectedContactName,
    });
  }

  showContacts() {
    // If there is at least one contact, automatically display the first one
    if (this.state.hasContacts) {
      return conversationList.map((convo) =>
        h(Contact, {
          ...convo,
          key: convo.contactId,
          onClick: () =>
            this.onContactClick(convo.contactId, convo.contactName),
          active: this.state.selectedContactID === convo.contactId,
        }),
      );
    }
    return 'There are no contacts.';
  }

  render() {
    // isContactSelected: true
    return h(GlobalContainer, [
      h(LeftContainer, this.showContacts()),
      h(CenterContainer, [
        h(Conversation, {
          contactID: this.state.selectedContactID,
          contactName: this.state.selectedContactName,
        }),
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
