import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { Body, BodyFaded } from '@woozy/ui';

const SelectedConversationStyle = styled.div`
  background-color: ${({ isSelected }) => (isSelected ? 'lavender ' : 'white')};
  height: 100px;
  width: 100%;
  outline: solid;
  outline-width: thin;
  outline-color: gray;
`;

export const Contact = (props) =>
  h(SelectedConversationStyle, { isSelected: props.isSelected }, [
    h(Body, props.contactName),
    h(BodyFaded, props.lastMessage),
  ]);
