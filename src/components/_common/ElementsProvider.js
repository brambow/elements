import React, { useState } from 'react';
import DefaultContext from '../../DefaultContext';
import { ThemeProvider as EmotionProvider } from 'emotion-theming';
import { ThemeProvider as ThemeUIProvider } from 'theme-ui';

const ElementsProvider = ({
  children,
  context,
  theme,
  themeUI,
  mapOverride
}) => {
  let ctx = context || DefaultContext;
  const ContextProvider = ctx.Provider || ctx;
  const [map, setMap] = useState(null);

  const value = {
    map: mapOverride ? mapOverride : map,
    setMap: setMap
  };

  let provider = (
    <EmotionProvider theme={theme || {}}>{children}</EmotionProvider>
  );

  if (themeUI === true) {
    provider = (
      <ThemeUIProvider theme={theme || {}}>{children}</ThemeUIProvider>
    );
  }

  return <ContextProvider value={value}>{provider}</ContextProvider>;
};

export default ElementsProvider;
