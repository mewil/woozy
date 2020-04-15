import { Fragment } from 'react';
import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import moment from 'moment';
import { isEmpty } from 'lodash';

import { Body, BodyFaded } from '@woozy/ui';

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
    Object.values(conversations).map(
      ({ id, user = {}, lastMessage = {} }, key) => {
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
              ? null
              : h(BodyFaded, `${content} - ${moment(timestamp).fromNow()}`),
          ],
        );
      },
    ),
  ]);
