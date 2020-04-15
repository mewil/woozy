import { Component } from 'react';
import { input, h } from 'react-hyperscript-helpers';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Button } from '@woozy/ui';

import { fetchLoginUserAction } from '../actions';

const InputContainer = styled.div`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    max-width: 400px;
    width: 100%;
    margin: 10px 0;
    padding: 8px;
    font-size: 1em;
  }
`;

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleAttributeChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onClickLogin() {
    const { username } = this.state;
    const { loginUser } = this.props;
    loginUser(username);
  }

  render() {
    const { username, password } = this.state;
    return h(InputContainer, [
      input({
        id: 'username',
        type: 'text',
        name: 'username',
        placeholder: 'username',
        value: username,
        onChange: this.handleAttributeChange.bind(this),
      }),
      input({
        id: 'password',
        type: 'password',
        name: 'password',
        placeholder: 'password',
        value: password,
        onChange: this.handleAttributeChange.bind(this),
      }),
      h(
        Button,
        {
          onClick: () => this.onClickLogin(),
        },
        ['Login'],
      ),
    ]);
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (username) =>
    dispatch(
      fetchLoginUserAction({
        username,
      }),
    ),
});

export const LoginPageConn = connect(null, mapDispatchToProps)(LoginPage);
