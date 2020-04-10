import { Component } from 'react';
import { input, h } from 'react-hyperscript-helpers';
import styled from 'styled-components';

import { Button } from '@woozy/ui';
// import { connect } from "react-redux";

const InputContainer = styled.div`
  margin: 30px 0;
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
          onClick: () => console.log(username),
        },
        ['Login'],
      ),
    ]);
  }
}

// import { Component } from "react";
// import { h, div } from "react-hyperscript-helpers";
// import InfiniteScroll from "react-infinite-scroll-component";

// import { FeedPost } from "./feed-post";

// export class ProfilePage extends Component {
//   render() {
//     const { fetchFeed } = this.props;
//     return div(h("hello"));
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchFeed: (page) =>
//       dispatch(
//         fetchFeedAction({
//           page,
//         }),
//       ),
//   };
// }

// export const ProfilePageConn = connect()(ProfilePage);
// mapStateToProps,
// mapDispatchToProps,
