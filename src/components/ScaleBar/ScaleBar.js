import React, { useContext, useState } from 'react';
import Context from '../../DefaultContext';
import { ScaleControl } from 'mapbox-gl';
import mapExists from '../../util/mapExists';

const ScaleBar = props => {
  const { position, maxWidth, unit } = props;
  const [scale, setScale] = useState(
    new ScaleControl({
      maxWidth: maxWidth ? maxWidth : 100,
      unit: unit ? unit : 'imperial'
    })
  );
  const config = useContext(Context);
  const { map } = config;

  if (!mapExists(map)) {
    return null;
  }

  const ctrlPosition = position ? position : 'bottom-left';

  //if we don't limit the addition to the map load event, we can
  //end up adding a lot of controls. For example, without this, the knobs
  //in Storybook added multiple versions of the component. I've tinkered with
  //trying to remove controls after comparing state, but so far no luck
  map.on('load', () => {
    map.addControl(scale, ctrlPosition);
  });

  return null; // no component returned for mapbox controls
};

export default ScaleBar;
