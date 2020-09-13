import React, { useContext } from 'react';
import { Button } from 'theme-ui';
import { FaHome } from 'react-icons/fa';
import Context from '../../DefaultContext';
import BaseComponent from '../_common/BaseComponent';
import mapExists from '../../util/mapExists';

const Home = ({
  sx,
  initBounds,
  initCenter,
  initZoom,
  initPitch,
  initBearing,
  intercept,
  ...rest
}) => {
  const config = useContext(Context);
  const { map } = config;

  const zoomToHome = () => {
    if (initBounds) {
      try {
        map.setPitch(initPitch ?? 0);
        map.setBearing(initBearing ?? 0);
        map.fitBounds(initBounds);
      } catch (err) {
        console.error(err);
      }
    } else if (initCenter && initZoom) {
      try {
        map.setCenter(initCenter);
        map.setZoom(initZoom);
        map.setPitch(initPitch ?? 0);
        map.setBearing(initBearing ?? 0);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error(
        'Home Button Error: required props are not present. Make sure you pass "initBounds" OR "initCenter" and "initZoom".'
      );
    }
  };

  return (
    <BaseComponent {...rest} className="cl-home-button">
      <Button
        sx={{
          ...sx
        }}
        data-testid="home-button"
        onClick={() => {
          if (mapExists(map)) {
            if (intercept) {
              try {
                if (Array.isArray(intercept)) {
                  intercept[0](map);
                  if (intercept[1]) { zoomToHome() };
                } else {
                  intercept();
                }
              } catch (interceptError) {
                zoomToHome();
              }
            } else {
              zoomToHome();
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
