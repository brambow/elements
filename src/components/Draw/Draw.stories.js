import React from 'react';
import Draw from './Draw';
import Map from '../Map/Map';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs, radios } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';

const customMapOptions = Object.assign({}, mapOptions, {
  center: [-100.207672, 39.581878],
  zoom: 3
});

storiesOf('Draw', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={customMapOptions} />
        <Draw
          baseType={radios('baseType', ['none', 'panel', 'button'], 'panel')}
        />
      </ElementsProvider>
    );
  });
