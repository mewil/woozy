import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  getConversations,
  fetchConversationsAction,
} from '@woozy/conversations';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  align-items: center;
`;

export class HomePage extends Component {
  componentDidMount() {
    const { fetchConversations } = this.props;
    fetchConversations();
  }

  render() {
    const { conversations } = this.props;
    return h(Container, [JSON.stringify(conversations)]);
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
