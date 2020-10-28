import React, { useContext, useEffect, useState } from 'react';
import { Button, Slider, Flex } from 'theme-ui';
import { FaPlus, FaMinus } from 'react-icons/fa';
import numeral from 'numeral';
import Context from '../../DefaultContext';
import BaseComponent from '../_common/BaseComponent';
import zoomIn from './util/zoomIn';
import zoomOut from './util/zoomOut';
import mapExists from '../../util/mapExists';

const Zoom = ({
  circular,
  horizontal,
  controlType,
  showZoomLevel,
  sx,
  ...rest
}) => {
  const config = useContext(Context);
  const { map } = config;
  const [zoom, setZoom] = useState(() => {
    if (!mapExists()) return false;
    return map.getZoom();
  });

  function displayZoom() {
    setZoom(numeral(map.getZoom()).format('0.0'));
  }

  useEffect(() => {
    if (mapExists(map)) {
      map.on('load', () => {
        displayZoom();
      });
      map.on('zoom', () => {
        displayZoom();
      });
    }
  }, [map]);

  let buttonStyle = {
    borderRadius: 'default',
    width: '32px',
    height: '32px',
    minWidth: '25px',
    minHeight: '25px',
    boxShadow: '0 0 4px rgba(0, 0, 0, .6)',
    padding: 0,
    margin: '1px',
    '&:hover': {
      bg: 'secondary'
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
      <Button sx={{ ...buttonStyle, bg: 'secondary', fontSize: 0 }}>
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

  let zoomControls;

  if (controlType === 'button' || controlType === undefined) {
    if (horizontal) {
      zoomControls = (
        <>
          {zoomOutBtn}
          {zoomLevelIndicator}
          {zoomInBtn}
        </>
      );
    } else {
      zoomControls = (
        <>
          {zoomInBtn}
          {zoomLevelIndicator}
          {zoomOutBtn}
        </>
      );
    }
  } else if (controlType === 'slider') {
    if (horizontal) {
      zoomControls = (
        <>
          {zoomOutBtn}
          <Slider
            step={0.1}
            min={0}
            max={22}
            value={zoom}
            onInput={(e) => {
              map.setZoom(e.target.value);
              return true;
            }}
          />
          {zoomInBtn}
        </>
      );
    } else {
      zoomControls = (
        <Flex
          sx={{
            maxWidth: '50px',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {zoomInBtn}
          <Slider
            step={0.1}
            min={0}
            max={22}
            sx={{
              width: '120px',
              my: 5,
              transform: 'rotate(270deg)'
            }}
            value={zoom}
            onInput={(e) => {
              map.setZoom(e.target.value);
              return true;
            }}
          />
          {zoomOutBtn}
        </Flex>
      );
    }
  } else {
    // eslint-disable-next-line no-console
    console.error(
      `Value for 'controlType' prop on Zoom component is not recognized.`
    );
  }

  return (
    <BaseComponent
      {...rest}
      baseType="none"
      sx={{
        display: 'flex',
        flexDirection,
        m: 1,
        ...sx
      }}
      className="cl-zoom-controls"
    >
      {zoomControls}
    </BaseComponent>
  );
};

export default Zoom;
