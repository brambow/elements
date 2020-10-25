// Base Component to give structure to all other major components

import React from 'react';
import { Box } from 'theme-ui';
import ButtonComponent from './ButtonComponent';
import Panel from './PanelComponent';

const BaseComponent = ({
  baseType, // 'none', 'panel', 'button'
  buttonOptions, // optional
  children,
  open,
  sx,
  ...rest
}) => {
  let topPos = sx?.top ?? '1rem';
  let leftPos = sx?.left ?? '1rem';

  if (sx?.bottom) {
    topPos = null;
  }

  if (sx?.right) {
    leftPos = null;
  }

  const baseStyle = {
    fontFamily: 'body',
    bg: 'transparent',
    position: sx?.position || 'absolute',
    top: topPos,
    left: leftPos,
    bottom: sx?.bottom,
    right: sx?.right,
    zIndex: sx?.zIndex ?? 2,
    ...sx
  };

  const buttonStyle = {
    fontFamily: 'body',
    bg: sx?.bg || 'primary',
    position: sx?.position || 'absolute',
    top: topPos,
    left: leftPos,
    bottom: sx?.bottom,
    right: sx?.right,
    zIndex: sx?.zIndex ?? 2,
    width: '32px',
    height: '32px',
    minWidth: '25px',
    minHeight: '25px',
    p: 0,
    m: 1,
    ...sx
  };

  const defaultType = (
    <Box {...rest} sx={baseStyle}>
      {children}
    </Box>
  );

  switch (baseType) {
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
          {...rest}
        />
      );
    default:
      return defaultType;
  }
};

export default BaseComponent;
