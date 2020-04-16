import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { Body, BodyFaded } from '@woozy/ui';
import moment from 'moment';

const Container = styled.div`
  background-color: ${({ selected }) => (selected ? '#EEE' : 'white')};
  height: 100px;
  width: 100%;
  padding 16px;
`;

export const Contact = ({
  onClick,
  selected,
  username = '',
  lastMessage = '',
  timestamp = moment(),
}) =>
  h(Container, { selected, onClick }, [
    h(Body, username),
    h(BodyFaded, `${lastMessage} - ${moment(timestamp).fromNow()}`),
  ]);
