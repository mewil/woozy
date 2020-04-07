import { Component } from 'react';
import { div } from 'react-hyperscript-helpers';
// import { connect } from "react-redux";

export class LoginPage extends Component {
    render() {
        return div('login');
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
