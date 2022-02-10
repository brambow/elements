import React, { useState } from 'react';
import { ThemeProvider as ThemeUIProvider } from 'theme-ui';
import DefaultContext from '../../DefaultContext';

const ElementsProvider = ({ children, context, theme, mapOverride }) => {
  const ctx = context || DefaultContext;
  const ContextProvider = ctx.Provider || ctx;
  const [map, setMap] = useState(null);
  const [drawMode, setDrawMode] = useState('none');
  const [selectMode, setSelectMode] = useState('none');

  const value = {
    map: mapOverride || map,
    setMap,
    drawMode,
    setDrawMode,
    selectMode,
    setSelectMode
  };

  const provider = (
    <ThemeUIProvider theme={theme || {}}>{children}</ThemeUIProvider>
  );

  return <ContextProvider value={value}>{provider}</ContextProvider>;
};

export default ElementsProvider;
