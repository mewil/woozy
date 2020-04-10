import { Component } from 'react';
import { h, div, li, ul } from 'react-hyperscript-helpers';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Subtitle, Body, BodyFaded, TextFaded } from 'app/ui/typography.js';
import { Input } from 'app/ui/input.js';
import { Button } from 'app/ui/button.js';


const ConversationItemStyle = styled.div`
  background-color: white;
  height: 100px;
  width: 100%;
  outline: solid;
  outline-width: thin;
  outline-color: gray;
  background-color: white
`;

const SelectedConversationStyle = styled.div`
    background-color: lavender;
    height: 100px;
    width: 100%;
    outline: solid;
    outline-width: thin;
    outline-color: gray;
`;



export class Contact extends Component {
    constructor(props){
        super(props);

        this.state = {
            isContactSelected: false,
            contactName: this.props.contactName,
            lastMessage: this.props.lastMessage
        }
    }
    componentDidMount(){
    }
  
    render() {
      if (this.state.isContactSelected) { 
        return(
          h(SelectedConversationStyle, [
              h(Body, this.state.contactName),
              h(BodyFaded, this.state.lastMessage)
            ])
        );
      }
      else {
        return(
          h(ConversationItemStyle, {onClick: () => {(this.setState({isContactSelected: !this.state.isContactSelected}))}},[
              h(Body, this.state.contactName),
              h(BodyFaded, this.state.lastMessage)
            ])
        );
      }
    }
  }