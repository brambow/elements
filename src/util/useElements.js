// hook to import Elements context
import React, { useContext } from 'react';
import Context from '../DefaultContext';

function useElements() {
  const ctx = useContext(Context);
  return ctx;
}

export default useElements;
