import React from 'react';
import MapInfo from './MapInfo';
import Map from '../Map/Map';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';

storiesOf('MapInfo', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions}>
          <MapInfo></MapInfo>
        </Map>
      </ElementsProvider>
    );
  });
