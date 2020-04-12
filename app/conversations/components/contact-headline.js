import { h, div } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { Body } from '@woozy/ui';

const ConversationHeaderWrapper = styled.div`
    width: 100%;
    height: 80px;
    background-color: 
    outline: solid;
    outline-width: thin;
    outline-color: gray;
`;

const contactStatus = (isFriendContact, isAvoidedContact) => {
  if (isFriendContact) return 'Woozy Friend';
  else if (isAvoidedContact) return 'Avoiding';
  return '';
};

export const Headline = ({ contactName, isFriendContact, isAvoidedContact }) =>
  h(ConversationHeaderWrapper, [
    h(Body, contactName),
    h(div, contactStatus(isFriendContact, isAvoidedContact)),
  ]);
