import React, { useContext } from 'react';
import { Button } from 'theme-ui';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Context from '../../DefaultContext';
import BaseComponent from '../_common/BaseComponent';
import zoomIn from './util/zoomIn';
import zoomOut from './util/zoomOut';

const Zoom = ({ circular, horizontal, sx, ...rest }) => {
  const config = useContext(Context);
  const {map} = config;

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
      {zoomOutBtn}
    </>
  );

  if (horizontal) {
    buttons = (
      <>
        {zoomOutBtn}
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
