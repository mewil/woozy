import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
// import { theme } from '@woozy/theme';
import { routes } from '../../app/constants';
import { getNotLoggedInUsers } from '@woozy/user';

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  align-items: center;
`;

const ScrollBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  height: 400px;
  width: 300px;
  overflow: auto;
  align-items: center;
  border: 1px solid black;
`;

const Title = styled.h1`
  font-size: 45px;
  align-items: center;
`;

const Rows = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
`;

const Container = styled.button`
  display: flex;
  margin: 20px;
  width: 200px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.success};
  padding: 10px;
  align-items: center;
  height: 40px;
`;

const FriendButton = styled.button`
  width: 50px;
  margin-left: 50px;
  margin-right: 50px;
  height: 30px;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const ContactName = styled.div`
  width: 150px;
  font-size: 15px;
  text-align: center;
  padding: 10px;
  align-items: center:
  display: flex;
`;

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  padding: 2px 20px;
  margin: 10px 0 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s;
  &:first-child {
    margin: 0;
    margin-left: 15px;
  }
`;
const FriendsPage = ({ users }) =>
  h(OuterContainer, [
    h(Title, 'Choose your Friends'),
    h(
      ScrollBox,
      Object.keys(users).map((k) =>
        h(Rows, [h(ContactName, users[k].username), h(FriendButton, 'Add')]),
      ),
    ),
    h(StyledNavLink, { to: routes.SETTINGS }, [h(Container, 'Done')]),
  ]);

const BlockedPage = ({ users }) =>
  h(OuterContainer, [
    h(Title, 'Choose people you want to avoid'),
    h(
      ScrollBox,
      Object.keys(users).map((k) =>
        h(Rows, [h(ContactName, users[k].username), h(FriendButton, 'Add')]),
      ),
    ),
    h(StyledNavLink, { to: routes.SETTINGS }, [h(Container, 'Done')]),
  ]);

const mapStateToProps = (state) => ({
  users: getNotLoggedInUsers(state),
});

export const FriendPageConn = connect(mapStateToProps)(FriendsPage);

export const BlockedPageConn = connect(mapStateToProps)(BlockedPage);
