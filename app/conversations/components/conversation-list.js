import { Fragment } from 'react';
import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import moment from 'moment';
import { isUndefined, map, filter, head } from 'lodash';

import { Body, BodyFaded, Text } from '@woozy/ui';

import { WOOZY_STATES } from '../constants';

const Container = styled.div`
  background-color: ${({ selected }) => (selected ? '#EEE' : 'white')};
  height: 100px;
  width: 100%;
  padding 16px;
`;

export const ConversationList = ({
  authId,
  conversations,
  conversationId,
  setConversationId,
}) =>
  h(Fragment, [
    map(conversations, ({ id, user = {}, messages = {} }, key) => {
      const lastMessage =
        head(
          filter(
            messages,
            ({
              woozyStatus = null,
              trustedFriendConversationId = null,
              fromUserId = null,
            }) =>
              woozyStatus === WOOZY_STATES.NOT_WOOZY ||
              woozyStatus === WOOZY_STATES.APPROVED ||
              (id === trustedFriendConversationId &&
                woozyStatus === WOOZY_STATES.PENDING &&
                fromUserId !== authId),
          ),
        ) || {};
      const { username } = user;
      const { content, timestamp } = lastMessage;
      return h(
        Container,
        {
          selected: conversationId === id,
          onClick: () => setConversationId(id),
          key,
        },
        [
          h(Body, username),
          isUndefined(content)
            ? h(Text, 'No Recent Messages')
            : h(BodyFaded, `${content} - ${moment(timestamp).fromNow()}`),
        ],
      );
    }),
  ]);
