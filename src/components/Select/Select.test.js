import React from 'react';
import {
  render,
  fireEvent,
  wait,
  // act,
  waitForElement
} from '@testing-library/react';
import Select from './Select';
import ElementsProvider from '../_common/ElementsProvider';
import mockMapContext from '../../util/mockMapContext';

jest.mock('@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw', () =>
  jest.fn(() => ({
    changeMode: jest.fn()
  }))
);

describe('Select component', () => {
  it('returns null if no map', () => {
    const { container } = render(
      <ElementsProvider>
        <Select />
      </ElementsProvider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders without error', async () => {
    const {
      container,
      getByTitle,
      getByLabelText,
      getByRole,
      getByText
    } = render(
      <ElementsProvider mapOverride={mockMapContext}>
        <Select selectableLayers={['road-primary']} showSelectableLayers />
      </ElementsProvider>
    );

    await wait(() => expect(container.firstChild).toBeInTheDocument());
    await wait(() => expect(getByTitle('Select By Point')).toBeInTheDocument());
    await wait(() =>
      expect(getByTitle('Select By Polygon')).toBeInTheDocument()
    );
    await wait(() => expect(getByTitle('Reset Selection')).toBeInTheDocument());

    await wait(() => expect(getByText('Selection Mode')).toBeInTheDocument());
    await wait(() =>
      expect(getByText('Selectable Layers')).toBeInTheDocument()
    );

    //test for layer list
    await wait(() => expect(getByRole('checkbox')).toBeInTheDocument());
    await wait(() =>
      expect(getByLabelText('road-primary')).toBeInTheDocument()
    );
  });

  it('buttons are disabled if no layer checked', () => {
    const { getByTitle, getByLabelText } = render(
      <ElementsProvider mapOverride={mockMapContext}>
        <Select selectableLayers={['road-primary']} showSelectableLayers />
      </ElementsProvider>
    );

    fireEvent.click(getByLabelText('road-primary'));

    expect(getByTitle('Select By Point')).toBeDisabled();
    expect(getByTitle('Select By Polygon')).toBeDisabled();
    expect(getByTitle('Reset Selection')).toBeDisabled();
  });

  it('buttons are enabled when a layer is checked and turn green when clicked', async () => {
    const { getByTitle, getByLabelText } = render(
      <ElementsProvider mapOverride={mockMapContext}>
        <Select selectableLayers={['road-primary']} showSelectableLayers />
      </ElementsProvider>
    );

    // fireEvent.click(getByLabelText('road-primary'));

    //this causes a console warning in the tests but doesn't affect passage

    // console.error node_modules/react-dom/cjs/react-dom.development.js:530
    // Warning: An update to Select inside a test was not wrapped in act(...).

    // When testing, code that causes React state updates should be wrapped into act(...):

    // act(() => {
    //   /* fire events that update state */
    // });
    // /* assert on the output */

    // This ensures that you're testing the behavior the user would see in the browser. Learn more at https://fb.me/react-wrap-tests-with-act
    //     in Select
    //     in ThemeProvider (created by ElementsProvider)
    //     in ElementsProvider

    const pointBtn = await waitForElement(() => getByTitle('Select By Point'));
    const polyBtn = await waitForElement(() => getByTitle('Select By Polygon'));

    expect(getByLabelText('road-primary')).toBeChecked();
    expect(pointBtn).toBeEnabled();
    expect(polyBtn).toBeEnabled();
    expect(getByTitle('Reset Selection')).toBeDisabled();

    fireEvent.click(pointBtn);

    expect(pointBtn).toHaveStyle('background-color: green');

    fireEvent.click(polyBtn);

    expect(polyBtn).toHaveStyle('background-color: green');
  });
});
