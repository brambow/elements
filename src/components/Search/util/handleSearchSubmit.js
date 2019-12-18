import { mapboxGeocode } from './geocode';
import config from '../../../config';

const handleSearchSubmit = async (searchValue, callback, mapboxToken) => {
  const result = await mapboxGeocode(searchValue, mapboxToken);
  callback(result);
};

export default handleSearchSubmit;
