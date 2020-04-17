import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';

import { Body, Button } from '@woozy/ui';

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #eee;
  border-radius: 3px;
  padding: 20px;
  box-shadow: 2px 2px 10px black;
`;

const ListItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 16px;
`;

export const NewConversationModal = ({
  users = [],
  fetchCreateConversation,
  theme,
  closeModal,
}) =>
  h(Container, { theme }, [
    h(Body, ['Start a new conversation:']),
    users.map(({ username, id }, key) =>
      h(ListItemContainer, { key }, [
        h(
          Button,
          {
            onClick: () => fetchCreateConversation(id),
          },
          [username],
        ),
      ]),
    ),
    h(
      Button,
      {
        hollow: true,
        onClick: () => closeModal(),
      },
      ['Nevermind'],
    ),
  ]);
