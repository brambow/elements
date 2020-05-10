import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Label, Radio } from 'theme-ui';
import ListItem from '../_primitives/ListItem';
import mapExists from '../../util/mapExists';
import { buildStyle } from './Legend';
import LayerActionsMenu from './LayerActionsMenu';

const GroupLayerItem = ({
  layerInfo,
  map,
  legend,
  showActions,
  itemActions,
  group,
  callback, // toggleGroupLayers,
  activeOnLoad
}) => {
  const [style, setStyle] = useState();

  const { layerIds } = layerInfo;

  const handleRadioChange = (e) => {
    const value = e.currentTarget.value.split(',');
    callback(value);
  };

  useEffect(() => {
    // let layerVisibility;
    // let checked;
    if (mapExists(map)) {
      if (Object.keys(map).length > 0) {
        map.once('idle', () => {
          // const layerVisibility = map.getLayoutProperty(
          //   layerIds[0],
          //   'visibility'
          // );
          // checked = layerVisibility !== 'none';
          if (legend) {
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

  const LegendListItem = () => {
    return (
      <Box>
        <ListItem
          css={{ display: legend && style ? '' : 'none' }}
          key={`${layerInfo.layerName}-legend`}
        >
          {style}
        </ListItem>
      </Box>
    );
  };

  return (
    <Box className="listItem">
      <ListItem key={layerInfo.layerName}>
        <Flex>
          <Label>
            <Radio
              name={group}
              onChange={(e) => {
                handleRadioChange(e);
              }}
              value={layerInfo.layerIds}
              defaultChecked={activeOnLoad}
            />
            <Text pt={1}>{layerInfo.layerName}</Text>
          </Label>
          {actionMenuSlot}
        </Flex>
      </ListItem>
      {legend ? <LegendListItem /> : null}
    </Box>
  );
};

export default GroupLayerItem;
