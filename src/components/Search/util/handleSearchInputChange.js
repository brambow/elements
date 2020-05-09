import { mapboxSuggest } from './suggest';

const handleSearchInputChange = async (
  value,
  setSearchValue,
  setSuggestions,
  mapboxToken
) => {
  const searchSuggestions = await mapboxSuggest(value, mapboxToken);
  setSearchValue(value);
  setSuggestions(searchSuggestions);
};

export default handleSearchInputChange;
