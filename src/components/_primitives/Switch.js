// Copying this, until ThemeUI merges this PR https://github.com/system-ui/theme-ui/pull/1035

import React from 'react';
import { Box } from 'theme-ui';

const GUTTER = 2;
const SIZE = 18;

const Switch = React.forwardRef(
  ({ className, sx, variant = 'switch', ...props }, ref) => {
    return (
      <Box>
        <Box
          ref={ref}
          as="input"
          type="checkbox"
          __themeKey="forms"
          {...props}
          sx={{
            position: 'absolute',
            opacity: 0,
            zIndex: -1,
            width: 1,
            height: 1,
            overflow: 'hidden'
          }}
        />
        <Box
          css={{
            padding: GUTTER
          }}
          __themeKey="forms"
          variant={variant}
          className={className}
          sx={sx}
          __css={{
            position: 'relative',
            bg: 'gray',
            borderRadius: SIZE,
            height: SIZE + GUTTER * 2,
            width: SIZE * 2 + GUTTER * 2,
            mr: 2,
            cursor: 'pointer',

            'input:disabled ~ &': {
              opacity: 0.5,
              cursor: 'not-allowed'
            },

            '& > div': {
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50%',
              height: SIZE,
              width: SIZE,
              bg: 'white',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              transform: 'translateX(0%)',
              transition: `transform 240ms cubic-bezier(0.165, 0.840, 0.440, 1.000)`
            },

            'input:checked ~ &': {
              bg: 'primary',
              '> div': {
                transform: 'translateX(100%)'
              }
            }
          }}
          {...props}
        >
          <Box />
        </Box>
      </Box>
    );
  }
);

export default Switch;
