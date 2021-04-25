// BasemapSwitcher  Component for changing basemaps

import React, { useState, useEffect, useContext, useRef } from 'react';
import { Button } from 'theme-ui';
import { FaMap } from 'react-icons/fa';
import DefaultContext from '../../DefaultContext';
import mapExists from '../../util/mapExists';
import RadioGroup from '../_primitives/RadioGroup';
import ButtonGroup from '../_primitives/ButtonGroup';
import BaseComponent from '../_common/BaseComponent';
/**
 * @class BasemapSwitcher
 */

const BasemapSwitcher = ({
  switcherStyle,
  basemaps,
  preserveLayers, // array of objects, each with 'source' and 'layer' properties. see https://bl.ocks.org/ryanbaumann/7f9a353d0a1ae898ce4e30f336200483/96bea34be408290c161589dcebe26e8ccfa132d7
  baseType,
  buttonOptions,
  sx,
  ...rest
}) => {
  const [basemapValue, setBasemapValue] = useState(
    basemaps ? basemaps[0].value : 'streets-v11'
  );
  const config = useContext(DefaultContext);
  const { map } = config;

  const didMountRef = useRef(false);

  const handleChange = (e, props) => {
    setBasemapValue(props.value);
  };

  useEffect(() => {
    if (didMountRef.current) {
      map.setStyle(`mapbox://styles/mapbox/${basemapValue}`);
    } else {
      didMountRef.current = true;
    }
  }, [basemapValue]);

  useEffect(() => {
    if (mapExists(map)) {
      map.on('load', () => {
        map.setStyle(`mapbox://styles/mapbox/${basemapValue}`);

        map.on('styledata', () => {
          const waiting = () => {
            if (!map.isStyleLoaded()) {
              setTimeout(waiting, 200);
            } else {
              for (let i = 0; i < preserveLayers?.length; i += 1) {
                const p = preserveLayers[i];
                if (!map.getSource(p.layer.source)) {
                  map.addSource(p.layer.source, p.source);
                  map.addLayer(p.layer);
                }
              }
            }
          };
          waiting();
        });
      });
    }
  }, [map]);

  const basemapOptions = basemaps || [
    {
      name: 'streets',
      key: 'streets',
      label: 'Streets',
      value: 'streets-v11',
      checked: true
    },
    {
      name: 'terrain',
      key: 'terrain',
      label: 'Terrain',
      value: 'outdoors-v11'
    },
    {
      name: 'satellite',
      key: 'satellite',
      label: 'Satellite',
      value: 'satellite-streets-v9'
    }
  ];

  let switcher;

  switch (switcherStyle) {
    case 'radio':
      switcher = (
        <RadioGroup
          items={basemapOptions}
          name="basemaps"
          checkedValueChange={handleChange}
        />
      );
      break;

    case 'buttons':
      // eslint-disable-next-line no-case-declarations
      const buttons = basemapOptions.map((item) => {
        return (
          <Button key={item.label} onClick={(e) => handleChange(e, item)}>
            {item.label}
          </Button>
        );
      });

      switcher = <ButtonGroup buttons={buttons} />;
      break;
    default:
      switcher = (
        <RadioGroup
          items={basemapOptions}
          name="basemaps"
          checkedValueChange={handleChange}
        />
      );
      break;
  }

  return (
    <BaseComponent
      baseType={baseType}
      buttonOptions={{
        icon: <FaMap />,
        title: 'Basemap Switcher',
        testId: 'cl-basemap-btn',
        ...buttonOptions
      }}
      {...rest}
      // type={switcherStyle === 'buttons' ? 'none' : 'panel'}
      sx={sx}
      className="cl-basemap-switcher"
    >
      {switcher}
    </BaseComponent>
  );
};

export default BasemapSwitcher;
