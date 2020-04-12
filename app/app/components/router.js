import { h } from 'react-hyperscript-helpers';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';

import { GlobalStyle } from '@woozy/theme';
import { getAuthUserIsLoggedIn } from '@woozy/user';

import { Routes } from './routes';
import { NavigatorConn } from './navigator';
import { history } from '../store';
import { bootAction } from '../actions';

const Router = ({ boot = () => {}, loggedIn }) => {
  boot();
  return h(
    ConnectedRouter,
    {
      history,
    },
    [h(NavigatorConn, [h(Routes, { loggedIn }), h(GlobalStyle)])],
  );
};

const mapStateToProps = (state) => ({
  loggedIn: getAuthUserIsLoggedIn(state),
});

const mapDispatchToProps = (dispatch) => ({
  boot: () => dispatch(bootAction()),
});

export const RouterConn = connect(mapStateToProps, mapDispatchToProps)(Router);
