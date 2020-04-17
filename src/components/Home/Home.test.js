import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';
import ElementsProvider from '../_common/ElementsProvider';
import mockMapContext from '../../util/mockMapContext';
import mapOptions from '../../util/mockMapOptions';

describe('Home component', () => {
  it('renders without error', () => {
    const { container, getByTestId } = render(
      <ElementsProvider mapOverride={mockMapContext}>
        <Home initZoom={mapOptions.zoom} initCenter={mapOptions.center} />
      </ElementsProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(getByTestId('home-button')).toBeInTheDocument();
  });
});
