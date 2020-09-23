import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'theme-ui';
import { FaPlus, FaMinus } from 'react-icons/fa';
import numeral from 'numeral';
import Context from '../../DefaultContext';
import BaseComponent from '../_common/BaseComponent';
import zoomIn from './util/zoomIn';
import zoomOut from './util/zoomOut';
import mapExists from '../../util/mapExists';

const Zoom = ({ circular, horizontal, showZoomLevel, sx, ...rest }) => {
  const config = useContext(Context);
  const { map } = config;
  const [zoom, setZoom] = useState('');

  function displayZoom() {
    setZoom(numeral(map.getZoom()).format('0.0'));
  }

  useEffect(() => {
    if (mapExists(map)) {
      // map.on('load', () => {
      map.on('zoom', () => {
        displayZoom();
      });
      // });
    }
  }, [map]);

  let buttonStyle = {
    borderRadius: 'default',
    minWidth: '25px',
    minHeight: '25px',
    padding: 0,
    margin: '1px',
    '&:hover': {
      bg: 'accent'
    }
  };

  if (circular) {
    buttonStyle = {
      ...buttonStyle,
      borderRadius: 'circle'
    };
  }

  let flexDirection = 'column';

  if (horizontal) {
    flexDirection = 'row';
  }

  let zoomLevelIndicator = null;

  if (showZoomLevel) {
    zoomLevelIndicator = (
      <Button
        sx={{
          width: '25px',
          height: '25px',
          bg: 'secondary',
          fontSize: 0,
          px: 0
        }}
      >
        {zoom}
      </Button>
    );
  }

  const zoomInBtn = (
    <Button
      title="Zoom In"
      sx={buttonStyle}
      className="cl-zoom-btn"
      circular={circular}
      onClick={() => {
        zoomIn(map);
      }}
    >
      <FaPlus />
    </Button>
  );

  const zoomOutBtn = (
    <Button
      title="Zoom Out"
      sx={buttonStyle}
      className="cl-zoom-btn"
      circular={circular}
      onClick={() => {
        zoomOut(map);
      }}
    >
      <FaMinus />
    </Button>
  );

  let buttons = (
    <>
      {zoomInBtn}
      {zoomLevelIndicator}
      {zoomOutBtn}
    </>
  );

  if (horizontal) {
    buttons = (
      <>
        {zoomOutBtn}
        {zoomLevelIndicator}
        {zoomInBtn}
      </>
    );
  }

  return (
    <BaseComponent
      {...rest}
      sx={{
        display: 'flex',
        flexDirection
      }}
      className="cl-zoom-controls"
    >
      {buttons}
    </BaseComponent>
  );
};

export default Zoom;
