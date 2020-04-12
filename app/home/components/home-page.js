import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Contact } from '@woozy/conversations/components/components/contact';
import { Conversation } from '@woozy/conversations/components/components/conversation';

import {
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
  background-color: beige;
  text-align: center;
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
        selectedContact: conversationList[0].contactId,
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

  onContactClick(newSelectedID) {
    console.log(newSelectedID);
    this.state = this.state; // place holder to pass lint test -- replace with logic
    // this.setState({
    //   selectedContact: newSelectedID,
    // });
  }

  showContacts() {
    // If there is at least one contact, automatically display the first one
    if (this.state.hasContacts) {
      return conversationList.map((convo) =>
        h(Contact, {
          key: convo.contactId,
          ...convo,
          active: this.state.selectedContact === convo.contactId,
        }),
      );
    }
    return '';
  }

  render() {
    return h(GlobalContainer, [
      h(LeftContainer, this.showContacts()),
      h(CenterContainer, [h(Conversation)]),
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
