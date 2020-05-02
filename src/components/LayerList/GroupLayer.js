import React, { useState, useEffect } from 'react';
import ListItem from '../_primitives/ListItem';
import { Checkbox, Flex, Text, Label, Box } from 'theme-ui';
import List from '../_primitives/List';
import toggleLayerVisibility from './util/toggleLayerVisibility';
import GroupLayerItem from './GroupLayerItem';
import mapExists from '../../util/mapExists';

const GroupLayer = ({ group, map, legend, showOnLoad = true }) => {
  const [isChecked, setIsChecked] = useState(showOnLoad);

  let layers = group.layers.map(layer => {
    const ids = layer.layerIds.map(id => {
      return id;
    });
    return ids;
  });

  layers = layers.flat();

  /* TO DO: figure out how to configure whether the group is visible or not on load */
  // useEffect(() => {
  //   let layerVisibility, checked;
  //   if (mapExists(map)) {
  //     if (Object.keys(map).length > 0) {
  //       map.once('idle', () => {

  //         layerVisibility = map.getLayoutProperty(layerIds[0], 'visibility');
  //         checked = layerVisibility === 'none' ? false : true;
  //         setIsChecked(checked);
  //         if (legend) {
  //           setStyle(
  //             layerInfo.legendStyle
  //               ? layerInfo.legendStyle()
  //               : buildStyle(map.getLayer(layerIds[0]))
  //           );
  //         }
  //       });
  //     }
  //   }
  // }, [map, layerInfo]);

  const handleChange = e => {
    const checked = e.currentTarget.checked;
    if (checked) {
      setIsChecked(true);
      layers.map(layerId => {
        toggleLayerVisibility(map, layerId, true);
      });
    } else {
      setIsChecked(false);
      layers.map(layerId => {
        toggleLayerVisibility(map, layerId, false);
      });
    }
  };

  const toggleGroupLayers = layerArray => {
    //make sure layers sent in are in the group
    const onLayers = layers.filter(layer => {
      return layerArray.includes(layer);
    });

    const offLayers = layers.filter(layer => {
      return !layerArray.includes(layer);
    });

    if (isChecked) {
      onLayers.map(layerId => {
        toggleLayerVisibility(map, layerId, true);
      });
      offLayers.map(layerId => {
        toggleLayerVisibility(map, layerId, false);
      });
    } else {
      layers.map(layerId => {
        toggleLayerVisibility(map, layerId, false);
      });
    }
  };

  const layerItems = group.layers.map((item, idx) => {
    return (
      <GroupLayerItem
        key={item.layerName}
        layerInfo={item}
        map={map}
        legend={legend}
        itemActions={item.actions}
        // showActions={item.showActions}
        group={group.groupName}
        callback={toggleGroupLayers}
        activeOnLoad={idx === 0 ? true : false}
      />
    );
  });

  return (
    <ListItem>
      <Box>
        <Flex sx={{ flexDirection: 'column' }}>
          <Label>
            <Checkbox checked={isChecked} onChange={handleChange} />
            <Text pt={1} sx={{ fontWeight: 'bold' }}>
              {group.groupName}
            </Text>
          </Label>
          <List>{layerItems}</List>
        </Flex>
      </Box>
    </ListItem>
  );
};

export default GroupLayer;
