import React, { useContext } from 'react';
import { FaLayerGroup } from 'react-icons/fa';
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
  showActions,
  checkboxStyle,
  baseType,
  buttonOptions,
  baseSx,
  sx,
  ...rest
}) => {
  const config = useContext(Context);
  const { map } = config;

  if (!mapExists(map)) return null;

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
    <BaseComponent
      baseType={baseType}
      buttonOptions={{
        icon: <FaLayerGroup />,
        title: 'Layer List',
        testId: 'cl-layerlist-btn',
        ...buttonOptions
      }}
      baseSx={baseSx}
      sx={sx}
      {...rest}
    >
      <List>{listItems}</List>
      <List> {groupItems}</List>
    </BaseComponent>
  );
};

export default LayerList;
