import React from 'react';
import { render } from '@testing-library/react';
import MapInfo from './MapInfo';
// import Map from '../Map/Map';
import ElementsProvider from '../_common/ElementsProvider';
import mockMapContext from '../../util/mockMapContext';
// import mapOptions from '../../util/mockMapOptions';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({
    on: () => jest.fn()
  })
}));

describe('MapInfo component', () => {
  it('renders without error', async () => {
    const { container, getByText } = render(
      <ElementsProvider mapOverride={mockMapContext}>
        {/* <Map mapOptions={mapOptions} /> */}
        <MapInfo />
      </ElementsProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(getByText('Center', { exact: false })).toBeInTheDocument();
  });
});
