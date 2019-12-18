import React from 'react';
import AddData from './AddData';
import Map from '../Map/Map';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';

storiesOf('AddData', module)
  .addDecorator(withKnobs)
  .add('In Panel', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <AddData panel />
      </ElementsProvider>
    );
  })
  .add('Off Panel', () => {
    return (
      <ElementsProvider>
        <AddData />
        <Map mapOptions={mapOptions} />
      </ElementsProvider>
    );
  });
