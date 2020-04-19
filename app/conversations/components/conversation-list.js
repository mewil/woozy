import { Fragment } from 'react';
import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import moment from 'moment';
import { isEmpty, map } from 'lodash';

import { Body, BodyFaded, Text } from '@woozy/ui';

const Container = styled.div`
  background-color: ${({ selected }) => (selected ? '#EEE' : 'white')};
  height: 100px;
  width: 100%;
  padding 16px;
`;

export const ConversationList = ({
  conversations,
  conversationId,
  setConversationId,
}) =>
  h(Fragment, [
    map(conversations, ({ id, user = {}, lastMessage = {} }, key) => {
      const { username } = user;
      const { content, timestamp } = lastMessage;
      return h(
        Container,
        {
          selected: conversationId === id,
          onClick: () => setConversationId(id),
          key,
          lastMessage: content,
          timestamp,
        },
        [
          h(Body, username),
          isEmpty(lastMessage)
            ? h(Text, 'No Recent Messages')
            : h(BodyFaded, `${content} - ${moment(timestamp).fromNow()}`),
        ],
      );
    }),
  ]);
