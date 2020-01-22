import React, { useContext } from 'react';
import List from '../_primitives/List';
import BaseComponent from '../_common/BaseComponent';
import LayerListItem from './LayerListItem';
import Context from '../../DefaultContext';
import mapExists from '../../util/mapExists';

const LayerList = ({ layers, legend = false, panel, showActions, ...rest }) => {
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

  return (
    <BaseComponent panel={panel} {...rest}>
      <List>{listItems}</List>
    </BaseComponent>
  );
};

export default LayerList;
