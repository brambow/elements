import React, { useContext } from 'react';
import { Button } from 'theme-ui';
import Context from '../../DefaultContext';
import BaseComponent from '../_common/BaseComponent';
import { FaHome } from 'react-icons/fa';
import mapExists from '../../util/mapExists';

const Home = ({ sx, initBounds, initCenter, initZoom, ...rest }) => {
  const config = useContext(Context);
  const { map } = config;
  return (
    <BaseComponent {...rest} className="cl-home-button">
      <Button
        sx={{
          ...sx
        }}
        data-testid="home-button"
        onClick={e => {
          if (mapExists(map)) {
            if (initBounds) {
              try {
                map.fitBounds(initBounds);
              } catch (err) {
                console.error(err);
              }
            } else if (initCenter && initZoom) {
              try {
                map.setCenter(initCenter);
                map.setZoom(initZoom);
              } catch (err) {
                console.error(err);
              }
            } else {
              console.error(
                'Home Button Error: required props are not present. Make sure you pass "initBounds" OR "initCenter" and "initZoom".'
              );
            }
          }
        }}
      >
        <FaHome />
      </Button>
    </BaseComponent>
  );
};

export default Home;
