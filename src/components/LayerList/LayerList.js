import React, { useContext } from 'react';
import List from '../_primitives/List';
import BaseComponent from '../_common/BaseComponent';
import LayerListItem from './LayerListItem';
import Context from '../../DefaultContext';
import mapExists from '../../util/mapExists';

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

      return <div key={group.groupName}>{layerItems}</div>;
    });
  }

  return (
    <BaseComponent panel={panel} {...rest}>
      <List>{listItems}</List>
      <List>{groupItems}</List>
    </BaseComponent>
  );
};

export default LayerList;
