import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { Body, BodyFaded } from '@woozy/ui';

const Container = styled.div`
  background-color: ${({ selected }) => (selected ? 'lavender ' : 'white')};
  height: 100px;
  width: 100%;
`;

export const Contact = ({ onClick, active, contactName, lastMessage }) =>
  h(SelectedConversationStyle, { isSelected: active, onClick }, [
    h(Body, contactName),
    h(BodyFaded, lastMessage),
  ]);
