import { h } from 'react-hyperscript-helpers';
import { Route, Switch, Redirect } from 'react-router';

import { ConversationPageConn } from '@woozy/conversations';
import {
  SettingPage,
  SetupPage,
  SchedulePage,
  FriendPageConn,
  BlockedPageConn,
} from '@woozy/settings';
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
            component: FriendPageConn,
          }),
          h(Route, {
            exact: true,
            path: routes.BLOCKED,
            component: BlockedPageConn,
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
