import React, { useState } from 'react';

import { Alert, Button, Flex } from 'theme-ui';

const AlertModal = ({ message }) => {
  const [show, setShow] = useState(true);

  if (!show) return null;
  return (
    <Alert variant="modal">
      <Flex sx={{ flexDirection: 'column' }}>
        <Flex sx={{ width: '100%', position: 'relative' }}>
          <p style={{ padding: 1 }}>{message}</p>
        </Flex>
        <Flex sx={{ justifyContent: 'flex-end' }}>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
            }}
          >
            OK
          </Button>
        </Flex>
      </Flex>
    </Alert>
  );
};

export default AlertModal;
