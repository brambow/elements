import React from 'react';
import {
  render,
  fireEvent,
  wait,
  waitForElement
} from '@testing-library/react';
import Measure from './Measure';
import ElementsProvider from '../_common/ElementsProvider';
import mockMapContext from '../../util/mockMapContext';

jest.mock('@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw', () =>
  jest.fn(() => ({
    changeMode: () => jest.fn(),
    getAll: () => jest.fn(),
    deleteAll: () => jest.fn()
  }))
);

describe('Measure component', () => {
  it('renders without error', () => {
    const { container, getByText, getByTitle } = render(
      <ElementsProvider mapOverride={mockMapContext}>
        <Measure />
      </ElementsProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(getByText('Measure')).toBeInTheDocument();
    expect(getByTitle('Measure Line')).toBeInTheDocument();
    expect(getByTitle('Measure Area')).toBeInTheDocument();
  });

  it('displays measurement options when active (line)', async () => {
    const { getByTitle, getByRole } = render(
      <ElementsProvider mapOverride={mockMapContext}>
        <Measure />
      </ElementsProvider>
    );

    const lineBtn = getByTitle('Measure Line');

    fireEvent.click(lineBtn);

    const listbox = await waitForElement(() => getByRole('listbox'));
    const deleteBtn = await waitForElement(() =>
      getByTitle('Delete Measurement')
    );

    expect(listbox).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
  });

  it('displays measurement options when active (area)', async () => {
    const { getByTitle, getByRole } = render(
      <ElementsProvider mapOverride={mockMapContext}>
        <Measure />
      </ElementsProvider>
    );

    const areaBtn = getByTitle('Measure Area');
    fireEvent.click(areaBtn);

    const listbox = await waitForElement(() => getByRole('listbox'));
    const deleteBtn = await waitForElement(() =>
      getByTitle('Delete Measurement')
    );

    expect(listbox).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
    // expect(getByTitle('Delete Measurement')).toBeVisible();
  });

  it('hides measurement options when reset is clicked', async () => {
    const { getByTitle, queryByRole } = render(
      <ElementsProvider mapOverride={mockMapContext}>
        <Measure />
      </ElementsProvider>
    );
    const areaBtn = getByTitle('Measure Area');
    fireEvent.click(areaBtn);

    const resetBtn = await waitForElement(() =>
      getByTitle('Delete Measurement')
    );
    fireEvent.click(resetBtn);

    await wait(() => expect(queryByRole('listbox')).toBeNull());
  });
});
