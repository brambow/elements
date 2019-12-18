import { mapboxSuggest } from './suggest';
import config from '../../../config';

const handleSearchInputChange = async (
  value,
  setSearchValue,
  setSuggestions,
  mapboxToken
) => {
  let searchSuggestions;

  searchSuggestions = await mapboxSuggest(value, mapboxToken);

  setSearchValue(value);
  setSuggestions(searchSuggestions);
};

export default handleSearchInputChange;
