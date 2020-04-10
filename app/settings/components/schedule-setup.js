import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
// import { theme } from '@woozy/theme';
import { routes } from '../../app/constants';

import { Calendar, Time } from '@woozy/ui';

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 45px;
  align-items: center;
`;

const SmallHeader = styled.h4`
  font-size: 25px;
  align-items: center;
  border: 1px solid black;
  background-color: #c0c0c0;
  padding: 15px;
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

export class SchedulePage extends Component {
  render() {
    return h(OuterContainer, [
      h(Title, 'When will you be going out?'),
      h(SmallHeader, 'Date'),
      h(Calendar, ''),
      h(SmallHeader, 'Start time'),
      h(Time, ''),
      h(SmallHeader, 'End time'),
      h(Time, ''),
      h(StyledNavLink, { to: routes.SETTINGS }, [h(Container, 'Done')]),
    ]);
  }
}
