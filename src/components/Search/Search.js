//Search Component for interacting with geocoding services or feature searches
//to do: consider using reach-ui combobox

import React, { useState, useContext } from 'react';
import Context from '../../DefaultContext';
import { Flex, Button } from 'rebass';
import { Combobox, ComboboxInput } from '@reach/combobox';
import SearchSuggestions from './SearchSuggestions';
import handleSearchInputChange from './util/handleSearchInputChange';
import handleSearchSubmit from './util/handleSearchSubmit';
import { FaSearchLocation } from 'react-icons/fa';
import BaseComponent from '../_common/BaseComponent';
import mapboxgl from 'mapbox-gl';

/*
 * @class Search
 * @param {Boolean} iconOnly
 */

const Search = ({ mapboxToken, iconOnly, sx, bg, ...rest }) => {
  const config = useContext(Context);
  const { map } = config;
  //hooks to set state
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

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

  const onSearchComplete = result => {
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
            onChange={e => {
              //RTL tests don't like 'e' need to figure this out
              if (e && e.currentTarget) {
                handleSearchInputChange(
                  e.currentTarget.value,
                  setSearchValue,
                  setSuggestions,
                  mapboxToken
                );
              }
            }}
          />
          <SearchSuggestions
            suggestions={suggestions}
            setSearchInput={setSearchValue}
          />
        </Combobox>
        <Button
          //TO DO: figure out better place for these styles
          bg={bg} //should we allow this or just enforce theme decisions?
          sx={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            marginLeft: '-0.175rem'
          }} //to line up with input
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
