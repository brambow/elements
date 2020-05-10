import suggest from './suggest';

const handleSearchInputChange = async (
  value,
  setSearchValue,
  setSuggestions,
  mapboxToken
) => {
  const searchSuggestions = await suggest(value, mapboxToken);
  setSearchValue(value);
  setSuggestions(searchSuggestions);
};

export default handleSearchInputChange;
