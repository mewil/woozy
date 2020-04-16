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

const messageStatus = (requestApproval, status) =>
  requestApproval ? h(MessageStatus, [WOOZY_STATES[status]]) : null;

export const Message = (props) => {
  let backgroundColor = '#EEE';
  if (props.isUser) {
    if (!props.requestApproval || props.status === 'APPROVED') {
      backgroundColor = 'lightgreen';
    } else if (props.status === 'PENDING') {
      backgroundColor = 'lightgoldenrodyellow';
    } else if (props.status === 'REJECTED') {
      backgroundColor = '#db4054';
    }
  }
  return h(
    Container,
    {
      style: props.isUser
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
        !props.isUser && props.requestApproval && props.status === 'PENDING'
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
                  onClick: () => this.updateMessageStatus('APPROVED'),
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
                  onClick: () => this.updateMessageStatus('REJECTED'),
                },
                ['Deny'],
              ),
            ])
          : messageStatus(props.requestApproval, props.status),
      ]),
    ],
  );
};
