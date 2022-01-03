import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { pxToRem } from '@strapi/helper-plugin';
import { Typography } from '@strapi/design-system/Typography';
import { Box } from '@strapi/design-system/Box';
import StepNumber from './StepNumber';
import StepLine from './StepLine';

const GridItemAlignCenter = styled(Box)`
  align-self: center;
`;

const GridItemJustifyCenter = styled(GridItemAlignCenter)`
  height: 100%;
  justify-self: center;
`;

const StepHomepage = ({ type, title, number, content, hasLine }) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <GridItemAlignCenter>
        <StepNumber type={type} number={number} />
      </GridItemAlignCenter>
      <GridItemAlignCenter>
        <Typography variant="delta" as="h3">
          {formatMessage(title)}
        </Typography>
      </GridItemAlignCenter>
      <GridItemJustifyCenter background="neutral100">
        {hasLine && <StepLine minHeight={pxToRem(64)} />}
      </GridItemJustifyCenter>
      <GridItemAlignCenter>{type === 'isActive' && content}</GridItemAlignCenter>
    </>
  );
};

StepHomepage.defaultProps = {
  content: undefined,
  number: undefined,
  type: 'isNotDone',
  hasLine: true,
};

StepHomepage.propTypes = {
  content: PropTypes.node,
  number: PropTypes.number,
  title: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(['isActive', 'isDone', 'isNotDone']),
  hasLine: PropTypes.bool,
};

export default StepHomepage;