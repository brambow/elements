import React from 'react';
import { render } from '@testing-library/react';
import ScaleBar from './ScaleBar';

//mocking mapboxGL and the ScaleControl
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  ScaleControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn()
  }))
}));

describe('ScaleBar component', () => {
  it('renders without error', () => {
    const { container } = render(<ScaleBar />);
    //scalebar does not render anything
    expect(container.firstChild).toBe(null);
  });
});
