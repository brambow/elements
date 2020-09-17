// Search Component for interacting with geocoding services or feature searches
// to do: consider using reach-ui combobox

import React, { useState, useContext, useCallback } from 'react';
import { Flex, Button } from 'theme-ui';
import { Combobox, ComboboxInput } from '@reach/combobox';
import { FaSearchLocation } from 'react-icons/fa';
import mapboxgl from 'mapbox-gl';
import debounce from 'lodash.debounce';
import Context from '../../DefaultContext';
import SearchSuggestions from './SearchSuggestions';
import handleSearchInputChange from './util/handleSearchInputChange';
import handleSearchSubmit from './util/handleSearchSubmit';
import BaseComponent from '../_common/BaseComponent';
import AlertModal from '../_common/AlertModal';

/*
 * @class Search
 * @param {Boolean} iconOnly
 */

const Search = ({
  mapboxToken,
  iconOnly,
  suggestionsZIndex,
  sx,
  bg,
  ...rest
}) => {
  if (!mapboxToken) {
    return (
      <AlertModal message="No Mapbox token found! The Search tool requires that you pass a token via the 'mapboxToken' prop." />
    );
  }
  const config = useContext(Context);
  const { map } = config;
  // hooks to set state
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // eslint-disable-next-line no-underscore-dangle
  const _handleSearchInputChange = useCallback(
    debounce(input => {
      handleSearchInputChange(input, setSuggestions, mapboxToken);
    }, 500), []
  );

  const btnContent = !iconOnly ? (
    <div>
      <Flex>
        <span>Search</span>
        <FaSearchLocation />
      </Flex>
    </div>
  ) : (
    <FaSearchLocation />
  );

  const onSearchComplete = (result) => {
    if (result && result.coordinates) {
      map.flyTo({ center: result.coordinates, zoom: 15 });

      const marker = new mapboxgl.Marker().setLngLat(result.coordinates);
      marker.addTo(map);
    }
  };

  return (
    <BaseComponent
      {...rest}
      className="cl-search"
      sx={{
        ...sx
      }}
    >
      <Flex>
        <Combobox>
          <ComboboxInput
            style={{ height: '32px', width: '200px' }}
            autoComplete="off"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              _handleSearchInputChange(e.target.value)
            }}
          />
          <SearchSuggestions
            zIndex={suggestionsZIndex ?? 5}
            suggestions={suggestions}
            setSearchInput={setSearchValue}
          />
        </Combobox>
        <Button
          // TO DO: figure out better place for these styles
          bg={bg} // should we allow this or just enforce theme decisions?
          sx={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            marginLeft: '-0.175rem'
          }} // to line up with input
          onClick={() => {
            handleSearchSubmit(searchValue, onSearchComplete, mapboxToken);
          }}
        >
          {btnContent}
        </Button>
      </Flex>
    </BaseComponent>
  );
};

export default Search;
