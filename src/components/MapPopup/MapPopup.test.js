import React from 'react';
import MapPopup from './MapPopup';
import { render } from '@testing-library/react';

const popupLayers = [
  {
    layerId: 'states-layer', // id of layer on map
    title: {
      field: 'name'
    }, // popup title field
    attributes: [
      {
        field: 'wikipedia', // original field name
        label: 'Wiki', // desired label
        type: 'link' // text, link, image
      },
      {
        field: 'postal',
        label: 'Postal',
        type: 'text'
      },
      {
        field: 'region',
        label: 'Region',
        type: 'text'
      },
      {
        field: 'name',
        label: 'Image',
        type: 'image',
        expression: function (val) {
          return `https://raw.githubusercontent.com/tannerjt/state_images.json/master/images/${val
            .toLowerCase()
            .replace(' ', '_')}.jpg`;
        }
      }
    ]
  }
];

//mocking mapboxGL and the ScaleControl
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Popup: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn()
  }))
}));

describe('MapPopup component', () => {
  it('renders without error', () => {
    const { getByText } = render(<MapPopup layers={popupLayers} />);
  });
});
