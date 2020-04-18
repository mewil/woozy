import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import { map, filter, includes, values, isNull } from 'lodash';
import Datetime from 'react-datetime';

import {
  fetchUpdateUserAction,
  getLoggedInUser,
  getNotLoggedInUsers,
} from '@woozy/user';
import { Title, Button } from '@woozy/ui';

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  align-items: center;
`;
const Container = styled.button`
  display: flex;
  margin: 20px;
  width: 350px;
  flex-direction: column;
  padding: 50px;
  align-items: center;
`;

const SaveButton = styled(Container)`
  width: 200px;
  background-color: ${({ theme }) => theme.success};
  padding: 10px;
  height: 40px;
`;

const ScrollBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  height: 400px;
  width: 400px;
  overflow: auto;
  align-items: center;
  border: 1px solid black;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
`;

const ContactName = styled.div`
  width: 150px;
  font-size: 15px;
  text-align: center;
  padding: 10px;
  align-items: center;
  display: flex;
`;

const SmallHeader = styled.h4`
  font-size: 25px;
  align-items: center;
  border: 1px solid black;
  background-color: ${({ theme }) => theme.mediumGray};
  padding: 15px;
`;

const TimingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  align-items: center;
`;

export class SettingsPage extends Component {
  updateTrustedFriend(id) {
    const { loggedInUser, updateUser } = this.props;
    const { avoidingId } = loggedInUser;
    updateUser({
      ...loggedInUser,
      trustedFriendId: id,
      avoidingId: values(avoidingId),
    });
  }

  toggleAvoidingId(id) {
    const { loggedInUser, updateUser } = this.props;
    const { avoidingId } = loggedInUser;
    updateUser({
      ...loggedInUser,
      avoidingId: values(
        includes(avoidingId, id)
          ? filter(avoidingId, (i) => i !== id)
          : { ...avoidingId, id },
      ),
    });
  }

  getTrustedFriendButton(trustedFriendId, id) {
    if (!trustedFriendId) {
      return h(
        Button,
        { hollow: true, onClick: () => this.updateTrustedFriend(id) },
        ['Set'],
      );
    } else if (trustedFriendId === id) {
      return h(
        Button,
        { hollow: true, onClick: () => this.updateTrustedFriend(null) },
        ['Unset'],
      );
    }
    return null;
  }

  render() {
    const { users, loggedInUser } = this.props;
    const { trustedFriendId, avoidingId } = loggedInUser;
    const possibleUsersToBeAvoided = filter(
      users,
      ({ id }) => trustedFriendId !== id,
    );
    const possibleUsersToBeTrusted = filter(users, ({ id }) =>
      isNull(trustedFriendId)
        ? !includes(avoidingId, id)
        : trustedFriendId === id,
    );
    return h(OuterContainer, [
      h(Title, 'Choose Trusted Friend'),
      h(ScrollBox, [
        map(possibleUsersToBeTrusted, ({ username, id }, key) =>
          h(Row, { key }, [
            h(ContactName, username),
            this.getTrustedFriendButton(trustedFriendId, id),
          ]),
        ),
      ]),
      h(Title, 'Choose Your Avoided Contacts'),
      h(ScrollBox, [
        map(possibleUsersToBeAvoided, ({ username, id }, key) =>
          h(Row, { key }, [
            h(ContactName, username),
            h(
              Button,
              { hollow: true, onClick: () => this.toggleAvoidingId(id) },
              [includes(avoidingId, id) ? 'Unavoid' : 'Avoid'],
            ),
          ]),
        ),
      ]),
      h(TimingContainer, [
        h(Title, 'When will you be going out?'),
        h(SmallHeader, 'Start time'),
        h(Datetime, ''),
        h(SmallHeader, 'End time'),
        h(Datetime, ''),
      ]),
      h(SaveButton, 'Save Settings'),
    ]);
  }
}

const mapStateToProps = (state) => ({
  users: getNotLoggedInUsers(state),
  loggedInUser: getLoggedInUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => dispatch(fetchUpdateUserAction({ user })),
  closeModal: () => dispatch(replace('/')),
});

export const SettingsPageConn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsPage);
