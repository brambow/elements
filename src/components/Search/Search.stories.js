import React from 'react';
import Search from './Search';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, radios } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';
import Map from '../Map/Map';
import config from '../../config.template';

storiesOf('Search', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <Search
          iconOnly={boolean('iconOnly', false)}
          mapboxToken={config.mapboxToken}
          baseType={radios('baseType', ['none', 'panel', 'button'], 'none')}
        />
      </ElementsProvider>
    );
  })
  .add('No Token Alert', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <Search
          iconOnly={boolean('iconOnly', false)}
          baseType={radios('baseType', ['none', 'panel', 'button'], 'none')}
        />
      </ElementsProvider>
    );
  });
