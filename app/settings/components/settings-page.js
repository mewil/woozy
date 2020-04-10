import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// import { theme } from '@woozy/theme';
import { routes } from '../../app/constants';


import { theme } from '@woozy/theme';

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

export class SettingPage extends Component {
  render() {
    return h(OuterContainer, [
      h(StyledNavLink, { to: routes.FRIENDS }, [
        h(Container, 'Choose your Friends'),
      ]),
      h(StyledNavLink, { to: routes.BLOCKED }, [
        h(Container, 'Choose people to avoid'),
      ]),
      h(StyledNavLink, { to: routes.SCHEDULE }, [
        h(Container, 'When will you be going out?'),
      ]),
      h(SaveButton, 'Save Settings'),
    ]);
  }
}
