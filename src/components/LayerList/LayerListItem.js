import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Label, Checkbox } from '@theme-ui/components';
import ListItem from '../_primitives/ListItem';
import mapExists from '../../util/mapExists';
import { buildStyle } from './Legend';
import toggleLayerVisibility from './util/toggleLayerVisibility';
import LayerActionsMenu from './LayerActionsMenu';

const LayerListItem = ({
  layerInfo,
  map,
  legend,
  showActions,
  itemActions
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [style, setStyle] = useState();

  const layerIds = layerInfo.layerIds;

  // let layerActions;

  // if (itemActions && itemActions.length > 0) {
  //   layerActions = itemActions;
  // } else {
  //   layerActions = null;
  // }

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
          if(legend) {
            setStyle(
              layerInfo.legendStyle
                ? layerInfo.legendStyle()
                : buildStyle(map.getLayer(layerIds[0]))
            );
          }
        });
      }
    }
  }, [map, layerInfo]);

  let actionMenuSlot;

  if (showActions) {
    actionMenuSlot = <LayerActionsMenu layerActions={itemActions} />;
  } else {
    actionMenuSlot = null;
  }

  return (
    <Box className="listItem">
      <ListItem key={layerInfo.layerName}>
        <Flex>
          <Label>
            <Checkbox onChange={handleChange} checked={isChecked} />
            <Text pt={1}>{layerInfo.layerName}</Text>
          </Label>
          {actionMenuSlot}
        </Flex>
      </ListItem>
      {(legend) ? 
        <ListItem
          css={{ display: legend && style ? '' : 'none' }}
          key={layerInfo.layerName + '-legend'}
        >
          {style}
        </ListItem>
        :
        null
      }
    </Box>
  );
};

export default LayerListItem;
