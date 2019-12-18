import React from 'react';
import Bookmarks from './Bookmarks';
import Map from '../Map/Map';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';

storiesOf('Bookmarks', module)
  .addDecorator(withKnobs)
  .add('Default (In Panel)', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <Bookmarks panel={true} />
      </ElementsProvider>
    );
  })
  .add('Out of Panel', () => {
    return (
      <ElementsProvider>
        <Bookmarks panel={false} />
        <Map mapOptions={mapOptions} />
      </ElementsProvider>
    );
  });
