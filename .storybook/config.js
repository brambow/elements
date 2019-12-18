import { configure, addParameters, addDecorator } from '@storybook/react';
// import { themes } from '@storybook/theming';
import theme from './cartolabTheme';
import { withThemesProvider } from 'storybook-addon-emotion-theme';
import * as themeui from '@theme-ui/presets';
import defaultTheme from '../src/themes/defaultTheme';

const presets = {
  defaultTheme,
  ...themeui
};

for (let key in presets) {
  presets[key].name = key;
}

const themeUIThemes = Object.values(presets);

const themes = [...themeUIThemes];

addDecorator(withThemesProvider(themes));

addParameters({
  options: {
    theme: theme
  }
});

function loadStories() {
  const req = require.context('../src/components', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
