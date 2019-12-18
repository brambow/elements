import React from 'react';
import { Box } from 'rebass';
import ListItem from '../_primitives/ListItem';
import childrenExist from '../../util/childrenExist';

const List = ({ items, children, sx, ...rest }) => {
  const style = { listStyleType: 'none', padding: 1, ...sx };

  if (childrenExist(children)) {
    return (
      <Box {...rest} as="ul" className="cl-list" sx={style}>
        {children}
      </Box>
    );
  }

  if (items && items.length > 0) {
    return (
      <Box {...rest} as="ul" className="cl-list" sx={style}>
        {items.map(item => (
          <ListItem>{item}</ListItem>
        ))}
      </Box>
    );
  } else {
    return false;
  }
};

export default List;
