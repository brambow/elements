// Base Component to give structure to all other major components

import React from 'react';
import { Box } from 'theme-ui';
import ButtonComponent from './ButtonComponent';
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
  type, // 'none', 'panel', 'button'
  buttonOptions, // optional
  // baseSx should only include positional properties for the base component container.
  // i.e. position, top, left,
  baseSx,
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
    ...baseSx
  };

  const buttonStyle = {
    fontFamily: 'body',
    position: 'absolute',
    // top: topPos,
    // left: leftPos,
    // bottom,
    // right,
    zIndex: 2,
    bg: 'primary',
    minWidth: '25px',
    minHeight: '25px',
    p: 0,
    m: 1,
    ...baseSx
  };

  const defaultType = (
    <Box {...rest} sx={baseStyle}>
      {children}
    </Box>
  );

  switch (type) {
    case 'none':
      return defaultType;
    case 'panel':
      return (
        <Panel {...rest} sx={baseStyle}>
          {children}
        </Panel>
      );
    case 'button':
      return (
        <ButtonComponent
          // eslint-disable-next-line react/no-children-prop
          children={children}
          buttonOptions={buttonOptions}
          sx={buttonStyle}
        />
      );
    default:
      return defaultType;
  }
};

export default BaseComponent;
