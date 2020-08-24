import suggest from './suggest';

const handleSearchInputChange = async (
  value,
  setSuggestions,
  mapboxToken
) => {
  const searchSuggestions = await suggest(value, mapboxToken);
  setSuggestions(searchSuggestions);
};

export default handleSearchInputChange;
