import React, { useState } from 'react';
import DefaultContext from '../../DefaultContext';

const ElementsProvider = ({ children, context, mapOverride }) => {
  const ctx = context || DefaultContext;
  const ContextProvider = ctx.Provider || ctx;
  const [map, setMap] = useState(null);

  const value = {
    map: mapOverride || map,
    setMap
  };

  return <ContextProvider value={value}>{children}</ContextProvider>;
};

export default ElementsProvider;
