import React from 'react';
import { notification } from 'antd';

export function notify({
  message,
  description,
  txid,
  type = 'info',
  placement = 'bottomLeft',
}: {
  message: string;
  description?: string | JSX.Element;
  txid?: string;
  type?: string;
  placement?: string;
}) {
  if (txid) {
    // description = (
      // <Link
      //   external
      //   to={'https://explorer.solana.com/tx/' + txid}
      //   style={{ color: '#0000ff' }}
      // >
      //   View transaction {txid.slice(0, 8)}...{txid.slice(txid.length - 8)}
      // </Link>
    // );
  }
  notification[type]({
    message: <span style={{ color: 'black' }}>{message}</span>,
    description: (
      <span style={{ color: 'black', opacity: 0.5 }}>{description}</span>
    ),
    placement,
    style: {
      backgroundColor: 'white',
    },
  });
}