import { h } from 'react-hyperscript-helpers';
import { Route, Switch, Redirect } from 'react-router';

import { ConversationPageConn } from '@woozy/conversations';
import { SettingsPageConn } from '@woozy/settings';
import { LoginPageConn } from '@woozy/user';

import { routes } from '../constants';

export const Routes = ({ loggedIn }) =>
  h(
    Switch,
    loggedIn
      ? [
          h(Route, {
            exact: true,
            path: routes.HOME,
            component: ConversationPageConn,
          }),
          h(Route, {
            exact: true,
            path: routes.SETTINGS,
            component: SettingsPageConn,
          }),
          h(Route, { component: ConversationPageConn }),
        ]
      : [
          h(Route, {
            exact: true,
            path: routes.LOGIN,
            component: LoginPageConn,
          }),
          h(Route, [
            h(Redirect, {
              to: routes.LOGIN,
            }),
          ]),
        ],
  );
