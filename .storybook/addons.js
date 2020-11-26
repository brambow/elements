import '@storybook/addon-knobs/register';
// import 'storybook-addon-emotion-theme/dist/register';
import '@storybook/addon-storysource/register';
import './design-addon/themeUI';
import { addons } from '@storybook/addons';
import cartolabTheme from './cartolabTheme';

addons.setConfig({
  theme: cartolabTheme
});
