// MapInfo Component for viewing position info

import React, { useState, useContext, useEffect } from 'react';
import numeral from 'numeral';
import { FaInfo } from 'react-icons/fa';
import DefaultContext from '../../DefaultContext';
import mapExists from '../../util/mapExists';
import BaseComponent from '../_common/BaseComponent';
/*
 * @class MapInfo
 */

const MapInfo = ({ baseType, buttonOptions, sx, ...rest }) => {
  const config = useContext(DefaultContext);
  const { map } = config;
  const [mapCenter, setMapCenter] = useState('');
  const [bounds, setBounds] = useState('');
  const [zoom, setZoom] = useState('');
  const [mouseCoords, setMouseCoords] = useState('');

  function displayCenter() {
    const lngLat = `${numeral(map.getCenter().lng).format(
      '0.00000'
    )}, ${numeral(map.getCenter().lat).format('0.00000')}`;
    setMapCenter(lngLat);
  }

  function displayZoom() {
    setZoom(numeral(map.getZoom()).format('0.00'));
  }

  function displayMouseCoords(e) {
    const lngLat = `${numeral(e.lngLat.lng).format('0.00000')}, ${numeral(
      e.lngLat.lat
    ).format('0.00000')}`;
    setMouseCoords(lngLat);
  }

  function displayBounds() {
    const mapBounds = map.getBounds();
    /* eslint-disable no-underscore-dangle */
    const display = `[${numeral(mapBounds._sw.lng).format(
      '0.00000'
    )}, ${numeral(mapBounds._sw.lat).format('0.00000')}, ${numeral(
      mapBounds._ne.lng
    ).format('0.00000')}, ${numeral(mapBounds._ne.lat).format('0.00000')}]`;
    setBounds(display);
    /* eslint-enable no-underscore-dangle */
  }

  useEffect(() => {
    if (mapExists(map)) {
      map.on('load', () => {
        displayCenter();
        displayZoom();
        displayBounds();
        map.on('move', () => {
          displayCenter();
          displayBounds();
        });
        map.on('zoom', () => {
          displayZoom();
        });
        map.on('mousemove', (e) => {
          displayMouseCoords(e);
        });
      });
    }
  }, [map]);

  if (!mapExists(map)) return null;

  return (
    <BaseComponent
      className="cl-mapinfo"
      baseType={baseType || 'none'}
      buttonOptions={{
        icon: <FaInfo />,
        title: 'Map Info',
        testId: 'cl-mapinfo-btn',
        ...buttonOptions
      }}
      sx={{
        padding: 2,
        fontSize: '9px',
        bg: 'primary',
        color: baseType === 'panel' ? 'text' : 'background',
        ...sx
      }}
      {...rest}
    >{`Center (lon/lat): ${mapCenter} degrees; Zoom: ${zoom}; Cursor: ${mouseCoords}; Bounds: ${bounds}`}</BaseComponent>
  );
};

export default MapInfo;
