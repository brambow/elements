import React, { useState, useEffect } from 'react';
import { Text, Label, Checkbox } from 'theme-ui';
import ListItem from '../_primitives/ListItem';
import mapExists from '../../util/mapExists';

const SelectLayerItem = ({
  layerName,
  activeSelectLayers,
  setActiveSelectLayers
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (activeSelectLayers.includes(layerName)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [activeSelectLayers]);

  const handleChange = e => {
    const {checked} = e.currentTarget;
    if (checked) {
      if (!activeSelectLayers.includes(layerName)) {
        setActiveSelectLayers([...activeSelectLayers, layerName]);
      }
    } else {
      const lyrs = activeSelectLayers.filter(lyr => {
        return lyr !== layerName;
      });

      setActiveSelectLayers(lyrs);
    }
  };

  if (!mapExists) return null;

  return (
    <ListItem key={layerName}>
      <Label>
        <Checkbox onChange={handleChange} checked={isChecked} />
        <Text pt={1}>{layerName}</Text>
      </Label>
    </ListItem>
  );
};

export default SelectLayerItem;
