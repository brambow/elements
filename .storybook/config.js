import { configure, addParameters, addDecorator } from '@storybook/react';
import theme from './cartolabTheme';
import { withThemeProvider } from 'storybook-addon-theme-ui';
import * as themeui from '@theme-ui/presets';
import defaultTheme from '../src/themes/defaultTheme';

const presets = {
  defaultTheme,
  ...themeui
};

let t = []

for (let key in presets) {
  const obj = {
    name: key,
    theme: presets[key]
  }

  t.push(obj)
  // presets[key].name = key;
}

// for (let key in presets) {
//   presets[key].name = key;
// }
// console.log(presets)
// const themeUIThemes = Object.values(presets);
// console.log(themeUIThemes)
// const themes = [...themeUIThemes];
// console.log(themes)
addDecorator(withThemeProvider);

addParameters({
  options: {
    theme: theme,
  },
  themeUi: {
    themes: t
  }
});

function loadStories() {
  const req = require.context('../src/components', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
