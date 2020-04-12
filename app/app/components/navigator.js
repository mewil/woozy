import React from 'react';
import { h } from 'react-hyperscript-helpers';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { getTheme } from '@woozy/theme';

import { HeaderConn } from './header';

const Container = styled.div`
  margin: 80px auto 0 auto;
`;

const Navigator = ({ theme, children }) =>
  h(IntlProvider, { locale: 'en' }, [
    h(ThemeProvider, { theme }, [
      h(HeaderConn),
      h(Container, [React.Children.toArray(children)]),
    ]),
  ]);

const mapStateToProps = (state) => ({
  theme: getTheme(state),
});

export const NavigatorConn = withRouter(connect(mapStateToProps)(Navigator));
