import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';

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

export class SettingPage extends Component {
  render() {
    return h(OuterContainer, [
      h(Container, 'Choose your Friends'),
      h(Container, 'Choose people to avoid'),
      h(Container, 'When will you be going out?'),
      h(SaveButton, 'Save Settings'),
    ]);
  }
}
