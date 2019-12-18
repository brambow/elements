import { create } from '@storybook/theming';
import logo from '../logo.png';

export default create({
  base: 'light',

  // colorPrimary: '#8cba80',
  // colorSecondary: '#8cba80',

  // UI
  // appBg: '#333333',
  // appContentBg: '#333333',
  // appBorderColor: '#8cba80',
  // appBorderRadius: 4,

  // Typography
  // fontBase: '"Lucida Console", "Courier New"',
  // fontBase: '"Open Sans", sans-serif',
  // fontCode: 'monospace',

  // Text colors
  // textColor: 'grey',
  // textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  // barTextColor: 'silver',
  // barSelectedColor: 'black',
  // barBg: '#333333',

  // Form colors
  // inputBg: 'white',
  // inputBorder: 'silver',
  // inputTextColor: 'black',
  // inputBorderRadius: 4,

  brandTitle: 'CartoLab Elements',
  brandUrl: 'https://www.cartolab.com',
  brandImage: logo
});
