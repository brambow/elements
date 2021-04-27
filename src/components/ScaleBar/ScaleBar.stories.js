import React from 'react';
import ScaleBar from './ScaleBar';
import Map from '../Map/Map';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';

const customMapOptions = Object.assign({}, mapOptions, {
  center: [-100.207672, 39.581878],
  zoom: 3,
  bounds: null
});

const posLabel = 'position';
const posOptions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

storiesOf('ScaleBar', module)
  // .addDecorator(withKnobs)
  .add('Default (Imperial)', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={customMapOptions} />
        <ScaleBar />
      </ElementsProvider>
    );
  })
  .add('Metric Units', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={customMapOptions} />
        <ScaleBar unit="metric" />
      </ElementsProvider>
    );
  })
  .add('Nautical Units', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={customMapOptions} />
        <ScaleBar unit="nautical" />
      </ElementsProvider>
    );
  });
