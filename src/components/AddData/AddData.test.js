import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddData from './AddData';
import ElementsProvider from '../_common/ElementsProvider';
import mockMapContext from '../../util/mockMapContext';

describe('AddData component', () => {
  it('returns null if no map', () => {
    const { container } = render(
      <ElementsProvider>
        <AddData />
      </ElementsProvider>
    );

    expect(container.firstChild).toBeNull();
  });
  it('renders without error', () => {
    const { container, getByText } = render(
      <ElementsProvider mapOverride={mockMapContext}>
        <AddData />
      </ElementsProvider>
    );
    expect(container.firstChild).toBeInTheDocument();
    expect(getByText('File')).toBeInTheDocument();
    expect(getByText('URL')).toBeInTheDocument();
  });
  it('switches tabs', () => {
    const { container, getByText, queryByText } = render(
      <ElementsProvider mapOverride={mockMapContext}>
        <AddData />
      </ElementsProvider>
    );

    const fileBtn = getByText('File');
    const urlBtn = getByText('URL');

    fireEvent.click(fileBtn);
    expect(getByText('Supported File Extensions:')).toBeInTheDocument();
    expect(queryByText('Add Layer')).not.toBeInTheDocument();

    fireEvent.click(urlBtn);
    expect(queryByText('Supported File Extensions:')).not.toBeInTheDocument();
    expect(getByText('Add Layer')).toBeInTheDocument();
  });
});
