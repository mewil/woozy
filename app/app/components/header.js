import { Fragment } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { h } from 'react-hyperscript-helpers';

// eslint-disable-next-line no-unused-vars
import { theme as globalTheme, devices, getTheme } from '@woozy/theme';

import { routes } from '../constants';

const Wrapper = styled.div`
  margin: 0 px 16%;
  ${devices.small`
        margin: 0px 8%;
    `};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-top: 15px
  padding-bottom: 15px
  z-index: 100;
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: flex-start;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

const Header = () =>
  h(Fragment, [
    h(Helmet, [h('title', 'Woozy')]),
    h(Wrapper, [
      h(HeaderNavLink, { to: routes.HOME }, 'Woozy'),
      h(NavContainer, [h(StyledNavLink, { to: routes.SIGNIN }, 'Signin'),h(StyledNavLink, { to: routes.SETTINGS }, 'Settings')]),
    ]),
  ]);

const mapStateToProps = (state) => ({
  theme: getTheme(state),
});

export const HeaderConn = connect(mapStateToProps)(Header);
