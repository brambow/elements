import { mapboxGeocode } from './geocode';

const handleSearchSubmit = async (searchValue, callback, mapboxToken) => {
  const result = await mapboxGeocode(searchValue, mapboxToken);
  callback(result);
};

export default handleSearchSubmit;
