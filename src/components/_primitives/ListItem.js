import React from 'react';
import { Box } from '@theme-ui/components';

const ListItem = props => {
  const { children, selectable } = props;

  const style = selectable
    ? {
        padding: 2,
        ':hover': {
          cursor: 'pointer',
          bg: 'primary',
          color: 'background'
        }
      }
    : { padding: 2 };

  return (
    <Box {...props} as="li" sx={style}>
      {children}
    </Box>
  );
};

export default ListItem;
