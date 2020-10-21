import React from 'react';
import AddData from './AddData';
import Map from '../Map/Map';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';
import { MdLibraryAdd } from 'react-icons/md';

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
        <AddData
          type="button"
          buttonOptions={{
            className: 'add-data-btn',
            icon: <MdLibraryAdd />,
            title: 'Add Data',
            testId: 'add-data-btn'
          }}
        />
        <Map mapOptions={mapOptions} />
      </ElementsProvider>
    );
  });
