import React, { useState, useEffect } from 'react';
import { Box, Text } from 'rebass';
import { Label, Checkbox } from '@rebass/forms';
import ListItem from '../_primitives/ListItem';
import mapExists from '../../util/mapExists';
import { buildStyle } from './Legend';
import toggleLayerVisibility from './util/toggleLayerVisibility';

const LayerListItem = ({ layerInfo, map, legend }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [style, setStyle] = useState();

  const layerIds = layerInfo.layerIds;

  const handleChange = e => {
    const checked = e.currentTarget.checked;
    layerIds.map(layerId => {
      if (checked) {
        setIsChecked(true);
        toggleLayerVisibility(map, layerId, true);
      } else {
        setIsChecked(false);
        toggleLayerVisibility(map, layerId, false);
      }
    });
  };

  useEffect(() => {
    let layerVisibility, checked;
    if (mapExists(map)) {
      if (Object.keys(map).length > 0) {
        map.on('idle', () => {
          layerVisibility = map.getLayoutProperty(layerIds[0], 'visibility');
          checked = layerVisibility === 'none' ? false : true;
          setIsChecked(checked);
          setStyle(
            layerInfo.legendStyle
              ? layerInfo.legendStyle()
              : buildStyle(map.getLayer(layerIds[0]))
          );
        });
      }
    }
  }, [map, layerInfo]);

  return (
    <Box className="listItem">
      <ListItem key={layerInfo.layerName}>
        <Label>
          <Checkbox onChange={handleChange} checked={isChecked} />
          <Text pt={1}>{layerInfo.layerName}</Text>
        </Label>
      </ListItem>
      <ListItem
        css={{ display: legend && style ? '' : 'none' }}
        key={layerInfo.layerName + '-legend'}
      >
        {style}
      </ListItem>
    </Box>
  );
};

export default LayerListItem;
