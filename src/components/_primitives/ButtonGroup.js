import React from 'react';
import { Flex } from '@theme-ui/components';

const ButtonGroup = ({ buttons, sx, children, ...rest }) => {
  let content;
  if (buttons) {
    content = buttons;
  } else {
    content = children;
  }
  return (
    <Flex
      alignItems="center"
      {...rest}
      className="cl-button-group"
      sx={{
        ...sx,
        '> button': {
          height: '32px',
          borderRadius: 0,
          borderWidth: '0.25px',
          borderColor: 'muted',
          borderStyle: 'solid',
          ':first-of-type': {
            borderTopLeftRadius: 'default',
            borderBottomLeftRadius: 'default',
            borderWidth: '0.5px',
            borderColor: 'muted',
            borderStyle: 'solid'
          },
          ':last-child': {
            borderTopRightRadius: 'default',
            borderBottomRightRadius: 'default',
            borderWidth: '0.5px',
            borderColor: 'muted',
            borderStyle: 'solid'
          }
        }
      }}
    >
      {content}
    </Flex>
  );
};

export default ButtonGroup;
