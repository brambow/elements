import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Bookmarks from './Bookmarks';
import { saveBookmark } from './util/bookmarkActions';

jest.mock('./util/bookmarkActions', () => {
  return {
    loadBookmarks: jest.fn(() => '[]'),
    saveBookmark: jest.fn()
  };
});

describe('Bookmarks component', () => {
  it('renders without error', () => {
    const { container } = render(<Bookmarks />);
    expect(container.firstChild).toBeInTheDocument();
  });
  it('calls the saveBookmark function without error', () => {
    const { getByRole } = render(<Bookmarks />);
    const saveButton = getByRole('button');

    fireEvent.click(saveButton);
    expect(saveBookmark).toHaveBeenCalled();
  });
});
