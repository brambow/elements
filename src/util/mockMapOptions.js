import config from '../config';

const mapOptions = {
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-95.7742, 29.80814],
  zoom: 10,
  accessToken: config.mapboxToken
};

export default mapOptions;
