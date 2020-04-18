import { Fragment } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { h } from 'react-hyperscript-helpers';

// eslint-disable-next-line no-unused-vars
import { theme as globalTheme, devices, getTheme } from '@woozy/theme';
import { getAuthUserIsLoggedIn } from '@woozy/user';

import { routes } from '../constants';

const Wrapper = styled.div`
  z-index: 90;
  padding: 15px 8%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 1px 2px 4px lightgray;
  justify-content: flex-end;
  background-color: white;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
`;

const HeaderNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.primary};
  margin: auto;
  margin-left: 0;
  font-size: 20px;
  padding: 2px 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s;
  text-transform: uppercase;
`;

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  padding: 2px 20px;
  margin: 10px 0 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s;
  text-transform: uppercase;
  &:first-child {
    margin: 0;
    margin-left: 15px;
  }
`;

const Header = ({ loggedIn }) =>
  h(Fragment, [
    h(Helmet, [h('title', 'Woozy')]),
    h(Wrapper, [
      h(HeaderNavLink, { to: routes.HOME }, 'Woozy'),
      h(NavContainer, [
        loggedIn
          ? h(Fragment, [
              h(StyledNavLink, { to: routes.SETTINGS }, 'SETTINGS'),
              h(StyledNavLink, { to: routes.NEW }, 'NEW'),
            ])
          : h(StyledNavLink, { to: routes.LOGIN }, 'LOGIN'),
      ]),
    ]),
  ]);

const mapStateToProps = (state) => ({
  theme: getTheme(state),
  loggedIn: getAuthUserIsLoggedIn(state),
});

export const HeaderConn = connect(mapStateToProps)(Header);
