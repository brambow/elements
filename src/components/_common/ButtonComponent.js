import React, { useState } from 'react';
import { Flex, Button } from 'theme-ui';
import Panel from './PanelComponent';

const ButtonComponent = ({ children, buttonOptions, sx /* ...rest */ }) => {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <Flex
      sx={{
        justifyContent: 'flex-start',
        bg: 'transparent',
        width: '400px',
        zIndex: 2
      }}
    >
      <Button
        title={buttonOptions?.title}
        className={buttonOptions?.className ?? 'cl-btn'}
        data-testid={buttonOptions?.testId ?? 'cl-btn'}
        onClick={() => {
          if (buttonOptions?.intercept) {
            try {
              buttonOptions.intercept();
            } catch (err) {
              // eslint-disable-next-line no-console
              console.error(err);
            }
          } else {
            setShowPanel(!showPanel);
          }
        }}
        sx={{
          minWidth: '25px',
          minHeight: '25px',
          p: 0,
          ...sx
        }}
      >
        {buttonOptions?.icon}
      </Button>

      {showPanel && (
        <Panel
          closable
          onClose={() => setShowPanel(false)}
          sx={{
            fontFamily: 'body',
            zIndex: 2,
            bg: 'transparent'
          }}
        >
          {children}
        </Panel>
      )}
    </Flex>
  );
};

export default ButtonComponent;
