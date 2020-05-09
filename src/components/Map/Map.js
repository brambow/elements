import React, { useEffect, useContext } from 'react';
import { Box } from 'theme-ui';
import mapboxgl from 'mapbox-gl';
import DefaultContext from '../../DefaultContext';

const Map = ({ mapOptions, mapLayers, sx, ...rest }) => {
  let map;
  const config = useContext(DefaultContext);
  const { setMap } = config;

  const _addLayers = layers => {
    if (!layers) return;
    map.on('load', () => {
      layers.forEach((l, i) => {
        map.addLayer(l);
      });
    });
  };

  useEffect(() => {
    // init the map
    map = new mapboxgl.Map(mapOptions);
    setMap(map);

    _addLayers(mapLayers);
  }, []);

  return (
    <Box
      {...rest}
      sx={{ width: '100vw', height: '100vh', ...sx }}
      ref={el => (mapOptions.container = el)}
      className="cl-map-container"
    />
  );
};

export default Map;
