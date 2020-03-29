import React, { useState } from 'react';
import ListItem from '../_primitives/ListItem';
import LayerListItem from './LayerListItem';
import { Checkbox, Flex, Text, Label, Box } from 'theme-ui';
import List from '../_primitives/List';
import toggleLayerVisibility from './util/toggleLayerVisibility';

const GroupLayer = ({ group, map, legend }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = e => {
    const checked = e.currentTarget.checked;
    console.log(group.layers);
    let layers = group.layers.map(layer => {
      const ids = layer.layerIds.map(id => {
        return id;
      });
      return ids;
    });

    layers = layers.flat();

    if (checked) {
      setIsChecked(true);
      console.log(layers);
      layers.forEach(layerId => {
        toggleLayerVisibility(map, layerId, true);
      });
    } else {
      setIsChecked(false);
      layers.forEach(layerId => {
        toggleLayerVisibility(map, layerId, false);
      });
    }
    // layerIds.map(layerId => {

    // });
  };

  const layerItems = group.layers.map(item => {
    return (
      <LayerListItem
        key={item.layerName}
        layerInfo={item}
        map={map}
        legend={legend}
        itemActions={item.actions}
        // showActions={item.showActions}
        group={group.groupName}
      />
    );
  });

  return (
    <ListItem>
      <Box>
        <Flex sx={{ flexDirection: 'column' }}>
          <Label>
            <Checkbox checked={isChecked} onChange={handleChange} />
            <Text pt={1}>{group.groupName}</Text>
          </Label>
          <List>{layerItems}</List>
        </Flex>
      </Box>
    </ListItem>
  );
};

export default GroupLayer;
