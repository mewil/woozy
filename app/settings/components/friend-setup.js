import { Component } from 'react';
import { h } from 'react-hyperscript-helpers';
import styled from 'styled-components';

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  align-items: center;
`;

const ScrollBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  height: 400px;
  width: 300px;
  overflow: auto;
  align-items: center;
  border: 1px solid black;
`;

const Title = styled.h1`
  font-size: 45px;
  align-items: center;
`;

const Rows = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
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

const FriendButton = styled.button`
  width: 50px;
  margin-left: 50px;
  margin-right: 50px;
  height: 30px;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const ContactName = styled.div`
  width: 150px;
  font-size: 15px;
  text-align: center;
  height: 50px;
  align-items: center:
  display: flex;
`;

export class FriendsPage extends Component {
  render() {
    return h(OuterContainer, [
      h(Title, 'Choose your friends'),
      h(ScrollBox, [
        h(Rows, [h(ContactName, 'Aditi'), h(FriendButton, 'Add')]),
        h(Rows, [h(ContactName, 'Sahil'), h(FriendButton, 'Add')]),
        h(Rows, [h(ContactName, 'Sydnie'), h(FriendButton, 'Add')]),
        h(Rows, [h(ContactName, 'Michael'), h(FriendButton, 'Add')]),
        h(Rows, [h(ContactName, 'Shameek'), h(FriendButton, 'Add')]),
        h(Rows, [h(ContactName, 'Rosie'), h(FriendButton, 'Add')]),
      ]),
      h(SaveButton, 'Done'),
    ]);
  }
}
