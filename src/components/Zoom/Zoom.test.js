import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Zoom from './Zoom';
import zoomIn from './util/zoomIn';
import zoomOut from './util/zoomOut';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: jest.fn(() => ({
    getZoom: jest.fn(),
    setZoom: jest.fn()
  }))
}));
jest.mock('./util/zoomIn', () => jest.fn());
jest.mock('./util/zoomOut', () => jest.fn());

describe('Zoom component', () => {
  // need to add test for zoom level indicator
  it('renders without error', () => {
    const { container, getByTitle } = render(<Zoom />);

    expect(getByTitle('Zoom In')).toBeInTheDocument();
    expect(getByTitle('Zoom Out')).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle(`flex-direction: column`);
  });

  it('circular style renders without error', () => {
    const { getByTitle } = render(<Zoom circular />);

    //tests against the theme radii.circle property
    expect(getByTitle('Zoom In')).toHaveStyle(`border-radius: circle`);
    expect(getByTitle('Zoom Out')).toHaveStyle(`border-radius: circle`);
  });
  it('horizontal style renders without error', () => {
    const { container } = render(<Zoom horizontal />);

    expect(container.firstChild).toHaveStyle(`flex-direction: row`);
  });
  it('calls zoom functions without error', () => {
    const { getByTitle } = render(<Zoom />);
    const incrementButton = getByTitle('Zoom In');
    const decrementButton = getByTitle('Zoom Out');

    // // Act
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);
    // // Assert
    expect(zoomIn).toHaveBeenCalled();
    expect(zoomOut).toHaveBeenCalled();
  });
});
