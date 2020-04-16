import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { Subtitle, Button } from '@woozy/ui';

const ConversationHeaderWrapper = styled.div`
  width: 100%;
  height: 70px;
  z-index: 10;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  background-color: white;
  padding: 10px;
  box-shadow: 1px 2px 4px lightgray;
  * {
    margin: 0px 10px;
  }
`;

const contactStatus = (isFriendContact, isAvoidedContact) => {
  if (isFriendContact) {
    return h(
      Button,
      { hollow: true, success: true, style: { pointerEvents: 'none' } },
      ['Trusted Friend'],
    );
  } else if (isAvoidedContact) {
    return h(
      Button,
      { hollow: true, danger: true, style: { pointerEvents: 'none' } },
      ['Avoided Contact'],
    );
  }
  return null;
};

export const Headline = ({ username, isFriendContact, isAvoidedContact }) =>
  h(ConversationHeaderWrapper, [
    h(Subtitle, username),
    contactStatus(isFriendContact, isAvoidedContact),
  ]);
