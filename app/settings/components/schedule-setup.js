import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 45px;
  align-items: center;
`;

const Rows = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

const Select = styled.select`
  align-items: center;
  padding: 20px;
`;

const Option = styled.option`
  color: black;
`;

const SmallHeader = styled.h4`
  font-size: 25px;
  align-items: center;
  border: 1px solid black;
  background-color: #c0c0c0;
  padding: 15px;
`;

const Container = styled.button`
  display: flex;
  margin: 20px;
  width: 350px;
  flex-direction: row;
  padding: 50px;
  align-items: center;
`;

const SaveButton = styled(Container)`
  width: 200px;
  background-color: green;
  padding: 10px;
  height: 40px;
`;

export class SchedulePage extends Component {
  render() {
    return h(OuterContainer, [
      h(Title, 'When will you be going out?'),
      h(SmallHeader, 'Date'),
      h(Rows, [
        h(Select, [
          h(Option, 'January'),
          h(Option, 'February'),
          h(Option, 'March'),
          h(Option, 'April'),
          h(Option, 'May'),
          h(Option, 'June'),
          h(Option, 'July'),
          h(Option, 'August'),
          h(Option, 'September'),
          h(Option, 'October'),
          h(Option, 'November'),
          h(Option, 'December'),
        ]),
        h(Select, [
          h(Option, 1),
          h(Option, 2),
          h(Option, 3),
          h(Option, 4),
          h(Option, 5),
          h(Option, 6),
          h(Option, 7),
          h(Option, 8),
          h(Option, 9),
          h(Option, 10),
          h(Option, 11),
          h(Option, 12),
          h(Option, 13),
          h(Option, 14),
          h(Option, 15),
          h(Option, 16),
          h(Option, 17),
          h(Option, 18),
          h(Option, 19),
          h(Option, 20),
          h(Option, 21),
          h(Option, 22),
          h(Option, 23),
          h(Option, 24),
          h(Option, 25),
          h(Option, 26),
          h(Option, 27),
          h(Option, 28),
          h(Option, 29),
          h(Option, 30),
          h(Option, 31),
        ]),
      ]),
      h(SmallHeader, 'Start time'),
      h(Rows, [
        h(Select, [
          h(Option, 1),
          h(Option, 2),
          h(Option, 3),
          h(Option, 4),
          h(Option, 5),
          h(Option, 6),
          h(Option, 7),
          h(Option, 8),
          h(Option, 9),
          h(Option, 10),
          h(Option, 11),
          h(Option, 12),
        ]),
        h(Select, [
          h(Option, '00'),
          h(Option, '15'),
          h(Option, '30'),
          h(Option, '45'),
        ]),
        h(Select, [h(Option, 'am'), h(Option, 'pm')]),
      ]),
      h(SmallHeader, 'End time'),
      h(Rows, [
        h(Select, [
          h(Option, 1),
          h(Option, 2),
          h(Option, 3),
          h(Option, 4),
          h(Option, 5),
          h(Option, 6),
          h(Option, 7),
          h(Option, 8),
          h(Option, 9),
          h(Option, 10),
          h(Option, 11),
          h(Option, 12),
        ]),
        h(Select, [
          h(Option, '00'),
          h(Option, '15'),
          h(Option, '30'),
          h(Option, '45'),
        ]),
        h(Select, [h(Option, 'am'), h(Option, 'pm')]),
      ]),
      h(SaveButton, 'Done'),
    ]);
  }
}
