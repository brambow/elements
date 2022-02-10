import React, { useState } from 'react';
import { ThemeProvider as ThemeUIProvider } from 'theme-ui';
import DefaultContext from '../../DefaultContext';

const ElementsProvider = ({ children, context, theme, mapOverride }) => {
  const ctx = context || DefaultContext;
  const ContextProvider = ctx.Provider || ctx;
  const [map, setMap] = useState(null);
  const [drawMode, setDrawMode] = useState(null);

  const value = {
    map: mapOverride || map,
    setMap,
    drawMode,
    setDrawMode
  };

  const provider = (
    <ThemeUIProvider theme={theme || {}}>{children}</ThemeUIProvider>
  );

  return <ContextProvider value={value}>{provider}</ContextProvider>;
};

export default ElementsProvider;
