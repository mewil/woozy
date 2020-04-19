import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker';
import { map, filter, includes, values, isNull } from 'lodash';
import moment from 'moment';

import {
  fetchUpdateUserAction,
  getLoggedInUser,
  getNotLoggedInUsers,
} from '@woozy/user';
import { Title, Button, Body } from '@woozy/ui';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 40px;
  align-items: center;
`;

const SectionContainer = styled.div`
  display: block;
  padding: 16px;
  margin: 10px;
  border: 1px solid ${({ theme }) => theme.mediumGray};
  border-radius: 10px;
  .activeNotifier {
    padding-bottom: 0px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  justify-content: space-between;
  * {
    margin: 0px 4px;
  }
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

  updateTimes(start, end) {
    const { loggedInUser, updateUser } = this.props;
    const { avoidingId } = loggedInUser;
    updateUser({
      ...loggedInUser,
      startAvoidTimestamp: start.toDate(),
      endAvoidTimestamp: end.toDate(),
      avoidingId: values(avoidingId),
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
    const { users, loggedInUser, closeSettings } = this.props;
    const {
      trustedFriendId = null,
      avoidingId,
      startAvoidTimestamp,
      endAvoidTimestamp,
    } = loggedInUser;
    const possibleUsersToBeAvoided = filter(
      users,
      ({ id }) => trustedFriendId !== id,
    );
    const possibleUsersToBeTrusted = filter(users, ({ id }) =>
      isNull(trustedFriendId)
        ? !includes(avoidingId, id)
        : trustedFriendId === id,
    );
    return h(Container, [
      h(Title, 'Choose Your Trusted Friend'),
      h(SectionContainer, [
        map(possibleUsersToBeTrusted, ({ username, id }, key) =>
          h(Row, { key }, [
            h(Body, username),
            this.getTrustedFriendButton(trustedFriendId, id),
          ]),
        ),
      ]),
      h(Title, 'Choose Your Avoided Contacts'),
      h(SectionContainer, [
        map(possibleUsersToBeAvoided, ({ username, id }, key) =>
          h(Row, { key }, [
            h(Body, username),
            h(
              Button,
              { hollow: true, onClick: () => this.toggleAvoidingId(id) },
              [includes(avoidingId, id) ? 'Unavoid' : 'Avoid'],
            ),
          ]),
        ),
      ]),
      h(Title, 'When Do You Want To Avoid These Contacts?'),
      h(
        SectionContainer,
        {
          style: {
            flexDirection: 'row',
            display: 'flex',
          },
        },
        [
          h(DateTimeRangeContainer, {
            ranges: {
              '12 Hours': [moment(), moment().add(12, 'hours')],
              '24 Hours': [moment(), moment().add(1, 'days')],
              '2 Days': [moment(), moment().add(2, 'days')],
              '5 Days': [moment(), moment().add(5, 'days')],
              '1 Week': [moment(), moment().add(7, 'days')],
            },
            local: {
              format: 'YYYY-M-D h:mm A',
            },
            start: isNull(startAvoidTimestamp)
              ? moment()
              : moment(startAvoidTimestamp),
            end: isNull(endAvoidTimestamp)
              ? moment().add(1, 'days')
              : moment(endAvoidTimestamp),
            applyCallback: (start, end) => this.updateTimes(start, end),
            autoApply: true,
            standalone: true,
            style: {
              standaloneLayout: { display: 'flex', maxWidth: 'fit-content' },
              fromDot: { display: 'none', paddingBottom: '8px' },
              toDot: { display: 'none', paddingBottom: '8px' },
            },
          }),
        ],
      ),
      h(
        Button,
        {
          success: true,
          onClick: () => closeSettings(),
          style: { marginTop: '10px' },
        },
        'Save Settings',
      ),
    ]);
  }
}

const mapStateToProps = (state) => ({
  users: getNotLoggedInUsers(state),
  loggedInUser: getLoggedInUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => dispatch(fetchUpdateUserAction({ user })),
  closeSettings: () => dispatch(replace('/')),
});

export const SettingsPageConn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsPage);
