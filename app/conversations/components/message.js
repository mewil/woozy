import { h, div, br } from 'react-hyperscript-helpers';
import styled from 'styled-components';

import { Button } from '@woozy/ui';

import { WOOZY_STATES } from '../constants';

const Container = styled.div`
  flex-direction: row;
  margin: 5px 10px;
  border-radius: 4px;
  max-width: 80%;
`;

const Text = styled.div`
  position: relative;
  color: black;
  margin: 8px;
  text-align: left;
  word-wrap: break-word;
`;

const MessageStatus = styled.p`
  color: #444;
  font-size: 11px;
  margin: 4px 0px;
`;

// show status if this is a text you're trying to send to an avoided user or this is a text you've signed off on
const renderMessageContent = (props) => {
  // if logged in user has approved or denied, show status
  const isReviewed =
    props.woozyStatus !== WOOZY_STATES.NOT_WOOZY &&
    props.isTrusted &&
    !(props.toUserId === props.loggedInUserId);
  // if message requested review, show status
  const wantsReview =
    props.isFromUser &&
    props.isAvoided &&
    props.woozyStatus !== WOOZY_STATES.NOT_WOOZY;
  return h(div, [
    isReviewed
      ? [
          props.fromUsername,
          ' wants to message ',
          props.toUsername,
          ':',
          h(br),
          h(br),
        ]
      : null,
    props.content,
    isReviewed || wantsReview ? h(MessageStatus, [props.woozyStatus]) : null,
  ]);
};
export const Message = (props) => {
  const { avoidingId = {} } = props.otherUser;
  // if this is a pending woozy message and the recipient is the trusted friend, requestApproval
  const requestApproval =
    props.woozyStatus === WOOZY_STATES.PENDING &&
    props.isTrusted &&
    !(props.toUserId === props.loggedInUserId);
  // don't render message if logged in user is avoided by otherUser and message is sent by other user and message is not approved
  let renderMessage = !(
    !props.isFromUser &&
    Object.values(avoidingId).includes(props.loggedInUserId) &&
    (props.woozyStatus === WOOZY_STATES.PENDING ||
      props.woozyStatus === WOOZY_STATES.DENIED)
  );
  // also don't render message if sent by logged in user but other user is not the recipient
  renderMessage =
    renderMessage &&
    !(props.isFromUser && props.otherUser.id !== props.toUserId);
  let backgroundColor = '#EEE';
  // if woozy messages are sent by logged in user and other user is avoided, change background to show status
  if (props.isFromUser) {
    backgroundColor = 'lightgreen';
  }
  if (props.isFromUser && props.isAvoided) {
    if (props.woozyStatus === WOOZY_STATES.APPROVED) {
      backgroundColor = 'lightgreen';
    } else if (props.woozyStatus === WOOZY_STATES.PENDING) {
      backgroundColor = 'lightgoldenrodyellow';
    } else if (props.woozyStatus === WOOZY_STATES.DENIED) {
      backgroundColor = '#db4054';
    }
  }
  return renderMessage
    ? h(
        Container,
        {
          style: props.isFromUser
            ? {
                alignSelf: 'flex-end',
                backgroundColor: backgroundColor,
              }
            : {
                alignSelf: 'flex-start',
                backgroundColor: backgroundColor,
              },
        },
        [
          h(Text, [
            !props.isFromUser &&
            requestApproval &&
            props.woozyStatus === WOOZY_STATES.PENDING
              ? h(div, [
                  props.fromUsername,
                  ' wants to message ',
                  props.toUsername,
                  ':',
                  h(br),
                  h(br),
                  props.content,
                  h(br),
                  h(
                    Button,
                    {
                      style: {
                        backgroundColor: 'lightgreen',
                        borderColor: '#888',
                        marginRight: '5px',
                        marginTop: '5px',
                      },
                      onClick: () =>
                        props.updateWoozyStatus(
                          props.id,
                          WOOZY_STATES.APPROVED,
                        ),
                    },
                    ['Approve'],
                  ),
                  h(
                    Button,
                    {
                      style: {
                        backgroundColor: '#db4054',
                        borderColor: '#888',
                        marginRight: '5px',
                        marginTop: '5px',
                      },
                      onClick: () =>
                        props.updateWoozyStatus(props.id, WOOZY_STATES.DENIED),
                    },
                    ['Deny'],
                  ),
                ])
              : renderMessageContent(props),
          ]),
        ],
      )
    : null;
};
