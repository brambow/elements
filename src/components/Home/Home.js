import React, { useContext } from 'react';
import { FaHome } from 'react-icons/fa';
import Context from '../../DefaultContext';
import BaseComponent from '../_common/BaseComponent';
import mapExists from '../../util/mapExists';

const Home = ({
  initBounds,
  initCenter,
  initZoom,
  initPitch,
  initBearing,
  intercept,
  baseSx,
  sx,
  buttonOptions,
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
    <BaseComponent
      {...rest}
      className="cl-home-button"
      baseType="button"
      baseSx={baseSx}
      buttonOptions={{
        icon: <FaHome />,
        title: 'Home',
        testId: 'home-button',
        intercept: () => {
          if (mapExists(map)) {
            if (intercept) {
              try {
                if (Array.isArray(intercept)) {
                  intercept[0](map);
                  if (intercept[1]) {
                    zoomToHome();
                  }
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
        }
      }}
    />
  );
};

export default Home;
