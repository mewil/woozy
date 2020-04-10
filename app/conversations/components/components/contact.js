import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { Body, BodyFaded } from '@woozy/ui';

const ConversationItemStyle = styled.div`
  background-color: white;
  height: 100px;
  width: 100%;
  outline: solid;
  outline-width: thin;
  outline-color: gray;
  background-color: white;
`;

const SelectedConversationStyle = styled.div`
  background-color: lavender;
  height: 100px;
  width: 100%;
  outline: solid;
  outline-width: thin;
  outline-color: gray;
`;

export const Contact = (props) => {
  const contactStyle = props.active
    ? SelectedConversationStyle
    : ConversationItemStyle;

  return h(contactStyle, [
    h(Body, props.contactName),
    h(BodyFaded, props.lastMessage),
  ]);
};
