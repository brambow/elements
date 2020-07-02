import React, { useContext } from 'react';
import List from '../_primitives/List';
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
  checkboxStyle,
  ...rest
}) => {
  const config = useContext(Context);
  const { map } = config;

  if (!mapExists(map)) return null;
  console.log(checkboxStyle);

  const listItems = layers.map((item) => {
    return (
      <LayerListItem
        key={item.layerName}
        layerInfo={item}
        map={map}
        legend={legend}
        itemActions={item.actions}
        showActions={showActions}
        checkboxStyle={checkboxStyle}
      />
    );
  });

  let groupItems;
  if (groupLayers && groupLayers.length > 0) {
    groupItems = groupLayers.map((group) => {
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
