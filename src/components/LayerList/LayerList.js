import React, { useContext } from 'react';
import { Checkbox, Flex, Text, Label, Box } from 'theme-ui';
import List from '../_primitives/List';
import ListItem from '../_primitives/ListItem';
import BaseComponent from '../_common/BaseComponent';
import LayerListItem from './LayerListItem';
import Context from '../../DefaultContext';
import mapExists from '../../util/mapExists';
import GroupLayer from './GroupLayer';

const LayerList = ({
  layers,
  groupLayers,
  legend = false,
  panel,
  showActions,
  ...rest
}) => {
  const config = useContext(Context);
  const {map} = config;

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
      return <GroupLayer group={group} map={map} legend={legend} />;
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
