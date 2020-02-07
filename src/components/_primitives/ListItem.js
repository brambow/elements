import React from 'react';
import { Box } from '@theme-ui/components';

const ListItem = props => {
  const { children, selectable, sx } = props;

  const style = selectable
    ? {
        padding: 2,
        ':hover': {
          cursor: 'pointer',
          bg: 'primary',
          color: 'background'
        },
        ...sx
      }
    : { padding: 2, ...sx };

  return (
    <Box {...props} as="li" sx={style}>
      {children}
    </Box>
  );
};

export default ListItem;
