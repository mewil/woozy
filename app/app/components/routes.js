import { h } from 'react-hyperscript-helpers';
import { Route, Switch } from 'react-router';

import { routes } from '../constants';
import { HomePageConn } from '@woozy/home';
import {
  SettingPage,
  SetupPage,
  SchedulePage,
  FriendsPage,
} from '@woozy/settings';
import { LoginPage } from '@woozy/user';

export const Routes = () =>
  h(Switch, [
    h(Route, {
      exact: true,
      path: routes.HOME,
      component: HomePageConn,
    }),
    h(Route, {
      exact: true,
      path: routes.SETTINGS,
      component: SettingPage,
    }),
    h(Route, {
      exact: true,
      path: routes.SETUP,
      component: SetupPage,
    }),
    h(Route, {
      exact: true,
      path: routes.SCHEDULE,
      component: SchedulePage,
    }),
    h(Route, {
      exact: true,
      path: routes.FRIENDS,
      component: FriendsPage,
    }),
    h(Route, {
      exact: true,
      path: routes.SIGNIN,
      component: LoginPage,
    }),
    h(Route, { component: HomePageConn }),
  ]);
