// Base Component to give structure to all other major components

import React from 'react';
import { Box } from 'theme-ui';
import Panel from './PanelComponent';

const BaseComponent = ({
  children,
  panel,
  open,
  top,
  left,
  bottom,
  right,
  sx,
  ...rest
}) => {
  let topPos = top || '1rem';
  let leftPos = left || '1rem';

  if (bottom) {
    topPos = undefined;
  }

  if (right) {
    leftPos = undefined;
  }

  const baseStyle = {
    fontFamily: 'body',
    position: 'absolute',
    top: topPos,
    left: leftPos,
    bottom,
    right,
    zIndex: 2,
    bg: 'transparent',
    ...sx
  };

  if (panel) {
    return (
      <Panel {...rest} sx={baseStyle}>
        {children}
      </Panel>
    );
  }

  return (
    <Box {...rest} sx={baseStyle}>
      {children}
    </Box>
  );
};

export default BaseComponent;
