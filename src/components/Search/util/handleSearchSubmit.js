import geocode from './geocode';

const handleSearchSubmit = async (searchValue, callback, mapboxToken) => {
  const result = await geocode(searchValue, mapboxToken);
  callback(result);
};

export default handleSearchSubmit;
