import React from 'react';
import AddData from './AddData';
import Map from '../Map/Map';
import Home from '../Home/Home';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';
import { Flex } from 'theme-ui';

storiesOf('AddData', module)
  .addDecorator(withKnobs)
  .add('In Panel', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />

        <AddData type="panel" />
      </ElementsProvider>
    );
  })
  .add('Off Panel', () => {
    return (
      <ElementsProvider>
        <AddData />
        <Map mapOptions={mapOptions} />
      </ElementsProvider>
    );
  })
  .add('Button', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions}>
          {' '}
          <Flex
            sx={{
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              position: 'absolute',
              top: '1rem',
              left: '1rem'
            }}
          >
            <AddData type="button" baseSx={{ position: 'relative' }} />
            <Home
              baseSx={{ position: 'relative' }}
              initCenter={[0, 0]}
              initZoom={7}
            />
          </Flex>
        </Map>
      </ElementsProvider>
    );
  });
