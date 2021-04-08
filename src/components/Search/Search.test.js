import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from './Search';
import ElementsProvider from '../_common/ElementsProvider';
import mockMapContext from '../../util/mockMapContext';
import handleSearchInputChange from './util/handleSearchInputChange';
import handleSearchSubmit from './util/handleSearchSubmit';
import config from '../../config';

//we put the event handler functions in separate files from the component so they could be called/mocked for tests
//functions inside functional React components can't be accessed the same way they can in class-style components
jest.mock('./util/handleSearchSubmit', () => jest.fn());
jest.mock('./util/handleSearchInputChange', () => jest.fn());

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

describe('Search component and utils', () => {
  it('renders without error', () => {
    const { container, getByText, getByRole } = render(
      <ElementsProvider mapOverride={mockMapContext}>
        <Search mapboxToken={config.mapboxToken} />
      </ElementsProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(getByText('Search')).toBeInTheDocument();
    expect(getByRole('comboboxw')).toBeInTheDocument();
  });

  it('calls the suggest function on input change', () => {
    const { getByRole } = render(
      <ElementsProvider mapOverride={mockMapContext}>
        <Search mapboxToken={config.mapboxToken} />
      </ElementsProvider>
    );

    const searchInput = getByRole('comboboxw');
    fireEvent.change(searchInput, { target: { value: '1600 Pennsylvania' } });
    expect(handleSearchInputChange).toHaveBeenCalled();
  });

  it('calls the search function when clicked', () => {
    const { getByText } = render(
      <ElementsProvider mapOverride={mockMapContext}>
        <Search mapboxToken={config.mapboxToken} />
      </ElementsProvider>
    );
    fireEvent.click(getByText('Search'));
    expect(handleSearchSubmit).toHaveBeenCalled();
  });
});
