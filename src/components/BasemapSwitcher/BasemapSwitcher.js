//BasemapSwitcher  Component for changing basemaps

import React, { useState, useEffect, useContext, useRef } from 'react';
import { Button } from '@theme-ui/components';
import DefaultContext from '../../DefaultContext';
import mapExists from '../../util/mapExists';
import RadioGroup from '../_primitives/RadioGroup';
import ButtonGroup from '../_primitives/ButtonGroup';
import BaseComponent from '../_common/BaseComponent';
/**
 * @class BasemapSwitcher
 */

const BasemapSwitcher = ({ componentStyle, basemaps, sx, panel, ...rest }) => {
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
      map.setStyle('mapbox://styles/mapbox/' + basemapValue);
    } else {
      didMountRef.current = true;
    }
  }, [basemapValue]);

  useEffect(() => {
    if (mapExists(map)) {
      map.on('load', () => {
        map.setStyle('mapbox://styles/mapbox/' + basemapValue);
      });
    }
  }, [map]);

  const basemapOptions = basemaps
    ? basemaps
    : [
        {
          name: 'streets',
          key: 'streets',
          label: 'Streets',
          value: 'streets-v11'
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

  switch (componentStyle) {
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
      const buttons = basemapOptions.map(item => {
        return (
          <Button key={item.label} onClick={e => handleChange(e, item)}>
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
      {...rest}
      panel={componentStyle === 'buttons' ? false : panel}
      sx={{
        ...sx
      }}
      className="cl-basemap-switcher"
    >
      {switcher}
    </BaseComponent>
  );
};

export default BasemapSwitcher;
