import React, { useContext } from 'react';
import List from '../_primitives/List';
import ListItem from '../_primitives/ListItem';
import BaseComponent from '../_common/BaseComponent';
import LayerListItem from './LayerListItem';
import Context from '../../DefaultContext';
import mapExists from '../../util/mapExists';
import { Checkbox, Flex, Text, Label, Box } from 'theme-ui';

const LayerList = ({
  layers,
  groupLayers,
  legend = false,
  panel,
  showActions,
  ...rest
}) => {
  const config = useContext(Context);
  const map = config.map;

  if (!mapExists(map)) return null;

  const listItems = layers.map(item => {
    return (
      <LayerListItem
        key={item.layerName}
        layerInfo={item}
        map={map}
        legend={legend}
        itemActions={item.actions}
        showActions={showActions}
      />
    );
  });

  let groupItems;
  if (groupLayers && groupLayers.length > 0) {
    groupItems = groupLayers.map(group => {
      const layerItems = group.layers.map(item => {
        return (
          <LayerListItem
            key={item.layerName}
            layerInfo={item}
            map={map}
            legend={legend}
            itemActions={item.actions}
            showActions={showActions}
            group={group.groupName}
          />
        );
      });

      return (
        <ListItem>
          <Box>
            <Flex sx={{ flexDirection: 'column' }}>
              <Label>
                <Checkbox />
                <Text pt={1}>{group.groupName}</Text>
              </Label>
              {layerItems}
            </Flex>
          </Box>
        </ListItem>
      );
    });
  }

  return (
    <BaseComponent panel={panel} {...rest}>
      <List>{listItems}</List>
      <List> {groupItems}</List>
    </BaseComponent>
  );
};

export default LayerList;
