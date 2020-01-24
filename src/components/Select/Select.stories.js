import React from 'react';
import Select from './Select';
import Map from '../Map/Map';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';
import mapLayers from '../../util/mockMapLayers';

const customMapOptions = Object.assign({}, mapOptions, {
  center: [-100.207672, 39.581878],
  zoom: 3
});

const geojsonLayer = {
  id: 'rivers-layer',
  type: 'line',
  source: {
    type: 'geojson',
    data:
      'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_rivers_north_america.geojson'
  },
  paint: {
    'line-color': 'blue'
  }
};
storiesOf('Select', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <ElementsProvider>
        <Map
          mapOptions={customMapOptions}
          mapLayers={[...mapLayers, geojsonLayer]}
        />
        <Select
          selectableLayers={['states-layer', 'rivers-layer']}
          panel={true}
          showSelectableLayers
        />
      </ElementsProvider>
    );
  })
  .add('No Layer Section Display', () => {
    return (
      <ElementsProvider>
        <Map
          mapOptions={customMapOptions}
          mapLayers={[...mapLayers, geojsonLayer]}
        />
        <Select
          selectableLayers={['states-layer', 'rivers-layer']}
          panel={true}
        />
      </ElementsProvider>
    );
  });
