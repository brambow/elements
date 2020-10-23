import React from 'react';
import { Card, Close, Flex } from 'theme-ui';

const PanelComponent = ({ closable, onClose, sx, children, ...rest }) => {
  return (
    <Card
      {...rest}
      className="cl-panel-component"
      color="text"
      sx={{
        ...sx,
        bg: 'background',
        padding: 3,
        paddingTop: 0,
        paddingRight: 0,
        width: '300px',
        borderRadius: '4px'

        // to do: add box shadow, move to theme
      }}
    >
      {closable && (
        <Flex sx={{ justifyContent: 'flex-end' }}>
          <Close
            sx={{
              color: 'text',
              height: '24px',
              width: '24px',
              ':hover': { cursor: 'pointer' }
            }}
            onClick={onClose}
          />
        </Flex>
      )}
      {children}
    </Card>
  );
};

export default PanelComponent;
