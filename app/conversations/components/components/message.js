import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';

const Container = styled.div`
  flex-direction: row;
  height: 80px;
  margin: 5px 10px;
  border-radius: 16;
  max-width: 80%;
`;

const Text = styled.p`
  position: relative;
  color: black;
  margin: 8px;
  font-size: 16;
  text-align: left;
  word-wrap: breakword;
`;

export const Message = (props) =>
  h(
    Container,
    {
      style: props.isUser
        ? {
            alignSelf: 'flex-end',
            backgroundColor: '#404040',
          }
        : {
            alignSelf: 'flex-start',
            backgroundColor: '#F0F2F7',
          },
    },
    [h(Text, [props.content])],
  );
