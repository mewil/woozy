import { h } from 'react-hyperscript-helpers';
import { Route, Switch } from 'react-router';

import { routes } from '../constants';
import { HomePageConn } from '@woozy/home';
import { SettingPage } from '@woozy/settings';

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
    h(Route, { component: HomePageConn }),
  ]);
