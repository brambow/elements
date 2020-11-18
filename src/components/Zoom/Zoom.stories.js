import React from 'react';
import Zoom from './Zoom';
import Bookmarks from '../Bookmarks/Bookmarks';
import Map from '../Map/Map';
import Home from '../Home/Home';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';
import { Flex } from 'theme-ui';

storiesOf('Zoom', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <Zoom
          circular={boolean('circular', false)}
          horizontal={boolean('horizontal', false)}
          showZoomLevel={boolean('showZoomLevel', false)}
        />
      </ElementsProvider>
    );
  })
  .add('Slider', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <Zoom
          circular={boolean('circular', false)}
          horizontal={boolean('horizontal', false)}
          controlType="slider"
        />
      </ElementsProvider>
    );
  })
  .add('Misc', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions}>
          <Flex
            sx={{ flexDirection: 'column', justifyContent: 'space-evenly' }}
          >
            <Zoom
              sx={{ position: 'relative' }}
              circular={boolean('circular', false)}
              horizontal={boolean('horizontal', false)}
            />
            <Home
              sx={{ position: 'relative' }}
              initBounds={mapOptions.bounds}
            />
            <Bookmarks baseType="button" sx={{ position: 'relative' }} />
          </Flex>
        </Map>
      </ElementsProvider>
    );
  });
