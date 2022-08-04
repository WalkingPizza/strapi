/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from 'react';
import { request } from '@strapi/helper-plugin';
import HistoryTable from '../../components/HistoryTable';
import { Loader } from '@strapi/design-system/Loader';
import { FormattedDate } from 'react-intl';
import { Tooltip } from '@strapi/design-system/Tooltip';
import { Typography } from '@strapi/design-system/Typography';
import { Box } from '@strapi/design-system/Box';
import { BaseHeaderLayout } from '@strapi/design-system/Layout';
import { Layout } from '@strapi/design-system/Layout';
import { Stack } from '@strapi/design-system/Stack';
import { Flex } from '@strapi/design-system/Flex';
import { PaginationURLQuery, PageSizeURLQuery, useQueryParams } from '@strapi/helper-plugin';

const IDENTITY_REGEX = /^(.*) <(.*)>$/g;

const mapSender = sender => {
  const identityGroups = IDENTITY_REGEX.exec(sender);

  if (identityGroups)
    return (
      <Tooltip description={identityGroups[2]}>
        <Typography>{identityGroups[1]}</Typography>
      </Tooltip>
    );
  return sender;
};

const mapNotification = notification => {
  const sender = mapSender(notification.sender);

  return {
    ...notification,
    sender,
    replyTo: notification.replyTo || sender,
    sentAt: (
      <FormattedDate
        value={notification.sentAt}
        year="numeric"
        month="2-digit"
        day="2-digit"
        hour="2-digit"
        minute="2-digit"
      />
    ),
  };
};

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState();
  const [pagination, setPagination] = useState();

  const [{ rawQuery }] = useQueryParams();

  const getNotifications = () => {
    setLoading(true);
    request(`/email-history/notifications${rawQuery}`)
      .then(({ results, pagination }) => {
        setNotifications(results.map(mapNotification));
        setPagination(pagination);
      })
      .finally(() => setLoading(false));
  };

  useEffect(getNotifications, []);
  useEffect(getNotifications, [rawQuery]);

  return (
    <>
      <BaseHeaderLayout title="Email History" />
      <Layout>
        <Box paddingLeft={10} paddingRight={10}>
          {loading ? (
            <Flex justifyContent="center">
              <Loader>Loading content...</Loader>
            </Flex>
          ) : (
            <Stack spacing={4}>
              <HistoryTable notifications={notifications} />
              <Box paddingTop={4}>
                <Flex alignItems="flex-end" justifyContent="space-between">
                  <PageSizeURLQuery />
                  <PaginationURLQuery pagination={pagination} />
                </Flex>
              </Box>
            </Stack>
          )}
        </Box>
      </Layout>
    </>
  );
};

export default HomePage;
