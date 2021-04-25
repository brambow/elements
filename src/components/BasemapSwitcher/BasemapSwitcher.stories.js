import React, { useEffect } from 'react';
import BasemapSwitcher from './BasemapSwitcher';
import Map from '../Map/Map';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs, radios } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';
import mapExists from '../../util/mapExists';
import useElements from '../../util/useElements';

const customLayers = [
  {
    source: {
      type: 'geojson',
      data:
        'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson'
    },
    layer: {
      id: 'states',
      source: 'states',
      type: 'line',
      paint: {
        'line-color': 'red',
        'line-width': 2
      }
    }
  }
];

const customMapOptions = Object.assign({}, mapOptions, {
  center: [-100.207672, 39.581878],
  zoom: 3,
  bounds: null
});

storiesOf('BasemapSwitcher', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const App = () => {
      const { map } = useElements();
      useEffect(() => {
        if (mapExists(map)) {
          map.on('load', () => {
            customLayers.forEach(customLayer => {
              map.addSource(customLayer.layer.source, customLayer.source);
              map.addLayer(customLayer.layer);
            });
          });
        }
      }, [map]);
      return (
        <React.Fragment>
          <Map mapOptions={customMapOptions} />
          <BasemapSwitcher
            preserveLayers={customLayers}
            baseType={radios('baseType', ['none', 'panel', 'button'], 'panel')}
            switcherStyle={radios('switcherStyle', ['radio', 'buttons'], 'radio')}
          />
        </React.Fragment>
      );
    };
    return (
      <ElementsProvider>
        <App />
      </ElementsProvider>
    );
  })
  .add('User Defined Maps', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <BasemapSwitcher
          baseType={radios('baseType', ['none', 'panel', 'button'], 'panel')}
          basemaps={[
            {
              name: 'light',
              key: 'light',
              label: 'Light',
              value: 'light-v10'
            },
            {
              name: 'dark',
              key: 'dark',
              label: 'Dark',
              value: 'dark-v10'
            }
          ]}
          switcherStyle={radios('switcherStyle', ['radio', 'buttons'], 'radio')}
        />
      </ElementsProvider>
    );
  });
