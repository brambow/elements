// //Base Component to give structure to all other major components

// import React from 'react';
// import { Box } from 'rebass';

// const BaseComponent = props => {
//   const [open, setOpen] = useState();

//   return (
//     <Box {...props} sx={{ fontFamily: 'body' }}>
//       {props.children}
//     </Box>
//   );
// };

// export default BaseComponent;

//Base Component to give structure to all other major components

import React from 'react';
import { Box } from 'rebass';
import Panel from '../_common/PanelComponent';

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
  let _top = top || '1rem';
  let _left = left || '1rem';

  if (bottom) {
    _top = undefined;
  }

  if (right) {
    _left = undefined;
  }

  const baseStyle = {
    fontFamily: 'body',
    position: 'absolute',
    top: _top,
    left: _left,
    bottom: bottom,
    right: right,
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
