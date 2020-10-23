// Base Component to give structure to all other major components

import React from 'react';
import { Box } from 'theme-ui';
import ButtonComponent from './ButtonComponent';
import Panel from './PanelComponent';

const BaseComponent = ({
  children,
  open,
  sx,
  baseType, // 'none', 'panel', 'button'
  buttonOptions, // optional
  // baseSx should only include positional properties for the base component container.
  // i.e. position, top, left,
  // should we strictly enforce this by filtering the available props in the object?
  baseSx,
  // we should allow rest, but what about the theme-ui/styled system css property?
  // it could get passed through and cause some unexpected styling behavior.
  // should we consider removing the 'css' or 'style' properties from ...rest?
  ...rest
}) => {
  let topPos = baseSx?.top ?? '1rem';
  let leftPos = baseSx?.left ?? '1rem';

  if (baseSx?.bottom) {
    topPos = null;
  }

  if (baseSx?.right) {
    leftPos = null;
  }

  const baseStyle = {
    fontFamily: 'body',
    bg: 'transparent',
    position: baseSx?.position || 'absolute',
    top: topPos,
    left: leftPos,
    bottom: baseSx?.bottom,
    right: baseSx?.right,
    zIndex: baseSx?.zIndex ?? 2,
    ...baseSx
  };

  const buttonStyle = {
    fontFamily: 'body',
    bg: baseSx?.bg || 'primary',
    position: baseSx?.position || 'absolute',
    top: topPos,
    left: leftPos,
    bottom: baseSx?.bottom,
    right: baseSx?.right,
    zIndex: baseSx?.zIndex ?? 2,
    width: '32px',
    height: '32px',
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
