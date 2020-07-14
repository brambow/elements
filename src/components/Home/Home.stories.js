import React from 'react';
import Home from './Home';
import Map from '../Map/Map';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';

storiesOf('Home', module)
  .addDecorator(withKnobs)
  .add('Using Zoom and Center', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <Home initCenter={mapOptions.center} initZoom={mapOptions.zoom} />
      </ElementsProvider>
    );
  })
  .add('Intercept With Standard Zoom', () => {
    const intercept = () => {
      alert('Intercepting, now zoom in to home!');
    };
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <Home initCenter={mapOptions.center} initZoom={mapOptions.zoom} intercept={[intercept, true]} />
      </ElementsProvider>
    );
  })
  .add('Intercept With Custom Zoom', () => {
    const intercept = (map) => {
      map.flyTo({
        center: mapOptions.center,
        zoom: mapOptions.zoom,
        bearing: mapOptions.bearing ?? 0,
        speed: 1.7,
        curve: 1.7,
        easing: function(t) {
          return t;
        },
        essential: true
      });
    };
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <Home initCenter={mapOptions.center} initZoom={mapOptions.zoom} intercept={[intercept, false]} />
      </ElementsProvider>
    );
  });
