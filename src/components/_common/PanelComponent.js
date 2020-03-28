import React from 'react';
import { Card } from 'theme-ui';

const PanelComponent = ({ sx, children, ...rest }) => {
  return (
    <Card
      {...rest}
      className="cl-panel-component"
      color="text"
      sx={{
        ...sx,
        bg: 'background',
        padding: 3,
        minWidth: '200px',
        maxWidth: '300px',
        borderRadius: '4px'

        //to do: add box shadow, move to theme
      }}
    >
      {children}
    </Card>
  );
};

export default PanelComponent;
