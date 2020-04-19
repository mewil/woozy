import { h, div } from 'react-hyperscript-helpers';
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

const messageStatus = (status) =>
  h(MessageStatus, [WOOZY_STATES[status]]);

export const Message = (props) => {
  console.log(props)
  // if this is a pending woozy message and the recipient is the trusted friend, requestApproval
  const requestApproval = props.woozyStatus === WOOZY_STATES.PENDING && props.isTrusted && !(props.toUserId === props.loggedInUserId);
  // don't render message if logged in user is avoided by otherUser and message is sent by other user and message is not approved
  let renderMessage = !(!props.isFromUser && Object.values(props.otherUser.avoidingId).includes(props.loggedInUserId) && (props.woozyStatus === WOOZY_STATES.PENDING || props.woozyStatus === WOOZY_STATES.DENIED));
  // also don't render message if sent by logged in user but other user is not the recipient
  renderMessage = renderMessage && !(props.isFromUser && props.otherUser.id !== props.toUserId);
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
  return renderMessage ? h(
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
        props.content,
        !props.isFromUser && requestApproval && props.woozyStatus === WOOZY_STATES.PENDING
          ? h(div, [
            h(
              Button,
              {
                style: {
                  backgroundColor: 'lightgreen',
                  borderColor: '#888',
                  marginRight: '5px',
                  marginTop: '5px',
                },
                onClick: () => props.updateWoozyStatus(props.id, WOOZY_STATES.APPROVED),
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
                onClick: () => props.updateWoozyStatus(props.id, WOOZY_STATES.DENIED),
              },
              ['Deny'],
            ),
          ])
          : messageStatus(props.woozyStatus),
      ]),
    ],
  ) : null
};
