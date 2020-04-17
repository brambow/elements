import React from 'react';
import Home from './Home';
import Map from '../Map/Map';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';

storiesOf('Home', module)
  .addDecorator(withKnobs)
  .add('Using Zoom and Center', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <Home initCenter={mapOptions.center} initZoom={mapOptions.zoom} />
      </ElementsProvider>
    );
  });
