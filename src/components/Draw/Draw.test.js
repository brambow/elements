import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Draw from './Draw';
import ElementsProvider from '../_common/ElementsProvider';
import mockMapContext from '../../util/mockMapContext';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => jest.fn(() => ({}))
}));

describe('Draw component', () => {
  it('returns null if no map', () => {
    const { container } = render(
      <ElementsProvider>
        <Draw />
      </ElementsProvider>
    );

    expect(container.firstChild).toBeNull();
  });
  it('renders without error', () => {
    const { container, getByTitle } = render(
      <ElementsProvider mapOverride={mockMapContext}>
        <Draw />
      </ElementsProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(getByTitle('Draw Point')).toBeInTheDocument();
    expect(getByTitle('Draw Line')).toBeInTheDocument();
    expect(getByTitle('Draw Polygon')).toBeInTheDocument();
    expect(getByTitle('Draw Text')).toBeInTheDocument();
    expect(getByTitle('Delete Drawing')).toBeInTheDocument();
  });
  //not sure what else to test as most of our other component tests UI elements
  //but not actual map interaction success
  //are there ways we can refactor to test if draw actions were fired?
});
