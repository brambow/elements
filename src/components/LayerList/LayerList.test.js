import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LayerList from './LayerList';
import toggleLayerVisibility from './util/toggleLayerVisibility';
import ElementsProvider from '../_common/ElementsProvider';
import mockMapContext from '../../util/mockMapContext';

jest.mock('./util/toggleLayerVisibility', () => jest.fn());

const layers = [
  {
    layerIds: ['national-park'], //fill
    layerName: 'National Parks'
  },
  {
    layerIds: ['water', 'water-shadow'], //fill
    layerName: 'Water'
  },
  {
    layerIds: ['road-motorway-trunk'], //line
    layerName: 'Motorway'
  },
  {
    layerIds: ['road-number-shield'], //symbol
    layerName: 'Road Shield',
    legendStyle: () => {
      return (
        <svg width="25" height="25">
          <rect
            x="0"
            y="0"
            rx="0"
            ry="0"
            width="25"
            height="7.5"
            style={{ fill: 'red', borderWidth: 3 }}
          />
        </svg>
      );
    }
  }
];

describe('LayerList component', () => {
  it('renders without error', () => {
    const { container, getByLabelText, getAllByRole } = render(
      <ElementsProvider mapOverride={mockMapContext}>
        <LayerList layers={layers} />
      </ElementsProvider>
    );
    const lyrName = layers[0].layerName;

    expect(container.firstChild).toBeInTheDocument();
    expect(getByLabelText(lyrName)).toBeInTheDocument();
    expect(getAllByRole('checkbox')[0]).toBeInTheDocument();
  });
  it('checking/unchecking a layer calls a function to change visibility', () => {
    const { getAllByRole } = render(
      <ElementsProvider mapOverride={mockMapContext}>
        <LayerList layers={layers} />{' '}
      </ElementsProvider>
    );
    const checkbox = getAllByRole('checkbox')[0];

    fireEvent.click(checkbox);

    expect(toggleLayerVisibility).toHaveBeenCalled();
  });
});
