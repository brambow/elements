import React, { useEffect, useContext } from 'react';
import { Box } from 'theme-ui';
import mapboxgl from 'mapbox-gl';
import DefaultContext from '../../DefaultContext';
import AlertModal from '../_common/AlertModal';

const Map = ({ mapOptions, mapLayers, supportMessage, sx, ...rest }) => {
  let map;
  const config = useContext(DefaultContext);
  const { setMap } = config;

  const addLayers = (layers) => {
    if (!layers) return;
    map.on('load', () => {
      layers.forEach((l) => {
        map.addLayer(l);
      });
    });
  };

  useEffect(() => {
    // init the map
    map = new mapboxgl.Map(mapOptions);
    setMap(map);

    addLayers(mapLayers);
  }, []);

  if (!mapboxgl.supported()) {
    return (
      <AlertModal
        message={
          supportMessage ||
          `WARNING! Your browser does not currently support this application, which requires MapboxGL. 
    Please ensure you are using the latest version of Chrome, Firefox, or Edge.
    Additionally, check https://get.webgl.org/ for compatibility with your system.`
        }
      />
    );
  }

  return (
    <Box
      {...rest}
      sx={{ width: '100vw', height: '100vh', ...sx }}
      ref={(el) => {
        // eslint-disable-next-line no-param-reassign
        mapOptions.container = el;
      }}
      className="cl-map-container"
    />
  );
};

export default Map;
