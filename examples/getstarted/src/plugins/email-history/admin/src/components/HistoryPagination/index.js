import React, { useMemo } from 'react';
import {
  Dots,
  NextLink,
  PageLink,
  Pagination,
  PreviousLink,
} from '@strapi/design-system/Pagination';
import { NavLink, useLocation } from 'react-router-dom';
import { parse, stringify } from 'qs';

const makeQuery = query => stringify(query, { encodeValuesOnly: true });

const HistoryPagination = ({ activePage, pageSize, total }) => {
  const { pathname, _search } = useLocation();

  const search = parse(_search);
  const pageCount = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);

  return (
    <Pagination activePage={activePage} pageCount={pageCount}>
      <PreviousLink
        number={1}
        to={`${pathname}?${makeQuery({ ...search, page: search.page - 1 })}`}
      >
        Go to previous page
      </PreviousLink>
      <PageLink as={NavLink} number={1} to={`${pathname}?${makeQuery({ ...search, page: 1 })}`}>
        Go to page 1
      </PageLink>
      <PageLink as={NavLink} number={2} to={`${pathname}?${makeQuery({ ...search, page: 2 })}`}>
        Go to page 2
      </PageLink>
      <Dots>And 23 other links</Dots>
      <PageLink number={25} to="/25">
        Go to page 3
      </PageLink>
      <PageLink number={26} to="/26">
        Go to page 26
      </PageLink>
      <NextLink to={`${pathname}?${makeQuery({ ...search, page: search.page - 1 })}`}>
        Go to next page
      </NextLink>
    </Pagination>
  );
};

export default HistoryPagination;
