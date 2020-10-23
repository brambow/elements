import React from 'react';
import Bookmarks from './Bookmarks';
import Map from '../Map/Map';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs, radios } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';
import {
  loadBookmarks,
  deleteBookmark,
  saveBookmark
} from './util/bookmarkActions';

const goToBookmark = (map, bookmark) => {
  map.flyTo({
    center: bookmark.center,
    zoom: bookmark.zoom,
    bearing: 0,
    speed: 0.5,
    curve: 1.7,
    easing: function (t) {
      return t;
    },
    essential: true
  });
  return true;
};

storiesOf('Bookmarks', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <Bookmarks
          type={radios('type', ['none', 'panel', 'button'], 'panel')}
        />
      </ElementsProvider>
    );
  })
  .add('Custom actions', () => {
    return (
      <ElementsProvider>
        <Bookmarks
          type={radios('type', ['none', 'panel', 'button'], 'panel')}
          goToBookmark={goToBookmark}
          loadBookmarks={loadBookmarks}
          deleteBookmark={deleteBookmark}
          saveBookmark={saveBookmark}
        />
        <Map mapOptions={mapOptions} />
      </ElementsProvider>
    );
  });
