import React from 'react';
import { ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox';

const SearchSuggestions = ({ suggestions, setSearchInput }) => {
  let items;
  if (suggestions && suggestions.length > 0) {
    items = suggestions.map((suggestion) => {
      return (
        <ComboboxOption
          style={{ listStyleType: 'none' }}
          key={suggestion.id}
          value={suggestion.place_name}
          onClick={() => {
            setSearchInput(suggestion.place_name);
          }}
        >
          {suggestion.place_name}
        </ComboboxOption>
      );
    });

    return (
      // to do: how to put style into theme or sx syntax
      <ComboboxPopover style={{ backgroundColor: '#fff' }}>
        <ComboboxList
          style={{ padding: 4, fontSize: 10, zIndex: 5 }}
          aria-labelledby="search"
        >
          {items}
        </ComboboxList>
      </ComboboxPopover>
    );
  }
  return null;
};

export default SearchSuggestions;
