import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Contact } from './contact';
import { Conversation } from './conversation';

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
  width: 50%;
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
  componentDidMount() {
    const { fetchConversations } = this.props;
    fetchConversations();
  }

  render() {
    return h(GlobalContainer, [
      h(
        LeftContainer,
        conversationList.map((convo) => h(Contact, convo)),
      ),
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
