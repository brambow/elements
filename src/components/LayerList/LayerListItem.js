import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Text,
  Label,
  Checkbox,
  Radio,
  Heading
} from '@theme-ui/components';
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
  itemActions,
  group
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [style, setStyle] = useState();

  const layerIds = layerInfo.layerIds;

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

  const handleRadioChange = e => {
    const value = e.currentTarget.value.split(',');
    value.map(val => {
      layerIds.map(layerId => {
        console.log(val, layerId);
        if (val === layerId) {
          setIsChecked(true);
          toggleLayerVisibility(map, layerId, true);
        } else {
          setIsChecked(false);
          toggleLayerVisibility(map, layerId, false);
        }
      });
    });
  };

  useEffect(() => {
    let layerVisibility, checked;
    if (mapExists(map)) {
      if (Object.keys(map).length > 0) {
        map.once('idle', () => {
          layerVisibility = map.getLayoutProperty(layerIds[0], 'visibility');
          checked = layerVisibility === 'none' ? false : true;
          setIsChecked(checked);
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
          key={layerInfo.layerName + '-legend'}
        >
          {style}
        </ListItem>
      </Box>
    );
  };

  const inputType = group ? (
    <Radio
      name={group}
      onChange={e => {
        console.log(e);
        handleRadioChange(e);
      }}
      value={layerInfo.layerIds}
      // defaultChecked={true}
    />
  ) : (
    <Checkbox onChange={handleChange} checked={isChecked} />
  );

  return (
    <Box className="listItem">
      <ListItem key={layerInfo.layerName}>
        <Flex>
          <Label>
            {inputType}
            <Text pt={1}>{layerInfo.layerName}</Text>
          </Label>
          {actionMenuSlot}
        </Flex>
      </ListItem>
      {legend ? <LegendListItem /> : null}
    </Box>
  );
};

export default LayerListItem;
