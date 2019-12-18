import React from 'react';
import Search from './Search';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';
import Map from '../Map/Map';
import config from '../../config';

storiesOf('Search', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <Search
          iconOnly={boolean('iconOnly', false)}
          mapboxToken={config.mapboxToken}
        />
      </ElementsProvider>
    );
  });
