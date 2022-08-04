import React from 'react';
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';

const HEADERS = [
  { key: 'id', value: 'ID' },
  { key: 'recipient', value: 'Recipient' },
  { key: 'subject', value: 'Subject' },
  { key: 'sentAt', value: 'Sent at' },
  { key: 'sender', value: 'Sender' },
  { key: 'replyTo', value: 'Reply to' },
];

const HistoryTable = ({ notifications = [], total = 0 }) => {
  return (
    <Table colCount={HEADERS.length} rowCount={total}>
      <Thead>
        <Tr>
          {HEADERS.map(({ value }) => (
            <Th key={value}>
              <Typography variant="sigma">{value}</Typography>
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {notifications.map(notification => (
          <Tr key={notification.id}>
            {HEADERS.map(({ key }) => (
              <Td key={key}>
                <Typography textColor="neutral800">{notification[key]}</Typography>
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default HistoryTable;
