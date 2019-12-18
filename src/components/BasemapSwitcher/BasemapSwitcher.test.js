import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BasemapSwitcher from './BasemapSwitcher';

describe('BasemapSwitcher component', () => {
  it('renders without error', () => {
    const { container } = render(<BasemapSwitcher />);
    expect(container.firstChild).toBeInTheDocument();
  });
  it('Radio style renders without error', () => {
    const { getAllByRole } = render(<BasemapSwitcher componentStyle="radio" />);
    expect(getAllByRole('radio')[0]).toBeInTheDocument();
  });
  it('Button style renders without error', () => {
    const { getAllByRole } = render(
      <BasemapSwitcher componentStyle="buttons" />
    );
    expect(getAllByRole('button')[0]).toBeInTheDocument();
  });
});
