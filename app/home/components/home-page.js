import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  Contact,
  Conversation,
  getConversations,
  fetchConversationsAction,
} from '@woozy/conversations';

const GlobalContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: white;
  outline: solid;
  outline-width: thin;
  outline-color: gray;
  height: 600px;
  width: 25%;
`;

const CenterContainer = styled.div`
  height: 600px;
  width: 75%;
  background-color: white;
  text-align: center;
  overflow: scroll;
`;

const conversationList = [
  {
    contactId: 1,
    contactName: 'Shameek Ray',
    lastMessage: 'Woozy is a great app',
    lastMessageTimestamp: '1021',
  },
  {
    contactId: 2,
    contactName: 'Michael Wilson',
    lastMessage: 'Use hyperscript',
    lastMessageTimestamp: '1033',
  },
];

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
  conversations: getConversations(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchConversations: () => dispatch(fetchConversationsAction()),
});

export const HomePageConn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
