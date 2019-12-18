import React from 'react';
import { render } from '@testing-library/react';
import Map from '../Map/Map';
import ElementsProvider from '../_common/ElementsProvider';
import mapOptions from '../../util/mockMapOptions';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

describe('Map component', () => {
  it('renders without error', () => {
    const { container, getByText } = render(
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
      </ElementsProvider>
    );
    // console.dir(container.firstChild);
    expect(container.firstChild).toBeInTheDocument();
  });
});
