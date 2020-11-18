import React, { useState } from 'react';
// import { ThemeProvider as EmotionProvider } from 'emotion-theming';
import { ThemeProvider as ThemeUIProvider } from 'theme-ui';
import DefaultContext from '../../DefaultContext';

const ElementsProvider = ({
  children,
  context,
  theme,
  // themeUI,
  mapOverride
}) => {
  const ctx = context || DefaultContext;
  const ContextProvider = ctx.Provider || ctx;
  const [map, setMap] = useState(null);

  const value = {
    map: mapOverride || map,
    setMap
  };

  // let provider = (
  //   <EmotionProvider theme={theme || {}}>{children}</EmotionProvider>
  // );

  // if (themeUI === true) {
  //   provider = (
  //     <ThemeUIProvider theme={theme || {}}>{children}</ThemeUIProvider>
  //   );
  // }

  const provider = (
    <ThemeUIProvider theme={theme || {}}>{children}</ThemeUIProvider>
  );

  return <ContextProvider value={value}>{provider}</ContextProvider>;
};

export default ElementsProvider;
