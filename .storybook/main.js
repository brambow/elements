const path = require('path');

//Lines 5-18 are related to theme-ui compatibility until storybook updates to emotion 11
// Location of root node_modules
const modulesDir = path.join(__dirname, '../node_modules');
const updateEmotionAliases = (config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      '@emotion/core': path.join(modulesDir, '@emotion/react'),
      '@emotion/styled': path.join(modulesDir, '@emotion/styled'),
      '@emotion/styled-base': path.join(modulesDir, '@emotion/styled'),
      'emotion-theming': path.join(modulesDir, '@emotion/react')
    }
  }
});

module.exports = {
  stories: ['../src/components/**/*.stories.js'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-storysource',
    './themeui-addon/register'
  ],
  //everything below is for getting themeui 0.6.2+ to work with storybook
  managerWebpack: updateEmotionAliases,
  webpackFinal: updateEmotionAliases,
  babel: (config) => {
    const getEntryIndexByName = (type, name) => {
      return config[type].findIndex((entry) => {
        const entryName = Array.isArray(entry) ? entry[0] : entry;
        return entryName.includes(name);
      });
    };

    // Replace reference to v10 of the Babel plugin to v11.
    const emotionPluginIndex = getEntryIndexByName(
      'plugins',
      'babel-plugin-emotion'
    );
    config.plugins[emotionPluginIndex] = require.resolve(
      '@emotion/babel-plugin'
    );

    // Storybook's Babel config is already configured to use the new JSX runtime.
    // We just need to point it to Emotion's version.
    // https://emotion.sh/docs/css-prop#babel-preset
    const presetReactIndex = getEntryIndexByName(
      'presets',
      '@babel/preset-react'
    );
    config.presets[presetReactIndex][1].importSource = '@emotion/react';

    return config;
  }
};
