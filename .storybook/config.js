import React from 'react';

import { configure, addDecorator } from '@storybook/react';
import { useAddonState } from '@storybook/client-api';

import * as themes from '@theme-ui/presets';

import { ThemeProvider as ThemeUIProvider } from 'theme-ui';

import defaultTheme from '../src/themes/defaultTheme';

// build all of our themes
// Want to add a new theme? Add theme object to this root allThemesObject
export const allThemes = {
  defaultTheme,
  ...themes
};

const Provider = ({ children, theme }) => {
  return (
    <ThemeUIProvider theme={theme ? allThemes[theme] : defaultTheme}>
      {children}
    </ThemeUIProvider>
  );
};

function loadStories() {
  const req = require.context('../src/components', true, /\.stories\.js$/);
  req.keys().forEach((filename) => req(filename));
}

export const parameters = { layout: 'fullscreen' };

addDecorator((Story) => {
  const [currentThemeName] = useAddonState('currentTheme');
  return (
    <Provider theme={currentThemeName}>
      <Story />
    </Provider>
  );
});

configure(loadStories, module);
