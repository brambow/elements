import React from 'react';
import { Card } from 'rebass';

const PanelComponent = ({ sx, children, ...rest }) => {
  return (
    <Card
      {...rest}
      className="cl-panel-component"
      color="text"
      bg="background"
      sx={{
        padding: 3,
        minWidth: '200px',
        maxWidth: '300px',
        borderRadius: '4px',
        ...sx
        //to do: add box shadow, move to theme
      }}
    >
      {children}
    </Card>
  );
};

export default PanelComponent;
