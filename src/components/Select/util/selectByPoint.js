import sourceExists from '../../../util/sourceExists';
import layerExists from '../../../util/layerExists';
import defaultSelectStyles from './defaultSelectStyles';

export default function selectByPoint(
  layers,
  point,
  map,
  existingSelection,
  setSelectedFeatures,
  selectStyles
) {
  const updateObj = {};
  for (let i = 0; i < layers.length; i += 1) {
    // get selected features for each active layer
    const selectedFeatures = map.queryRenderedFeatures(point, {
      layers: [layers[i]]
    });
    let newSelection = {};
    if (selectedFeatures.length > 0) {
      if (
        Object.keys(existingSelection).length === 0 &&
        existingSelection.constructor === Object
      ) {
        updateObj[layers[i]] = selectedFeatures;
        newSelection = { [layers[i]]: selectedFeatures };
      } else if (
        Object.keys(existingSelection).length > 0 &&
        existingSelection.constructor === Object
      ) {
        updateObj[layers[i]] = [
          ...existingSelection[layers[i]],
          ...selectedFeatures
        ];
        newSelection = {
          [layers[i]]: [...existingSelection[layers[i]], selectedFeatures[0]]
        };
      }

      let layerType = selectedFeatures[0].layer.type;
      const sourceName = `${layers[i]}-selected-src`;

      const src = sourceExists(map, sourceName);
      let paint;
      if (!src) {
        map.addSource(sourceName, {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: selectedFeatures }
        });

        let style = defaultSelectStyles;
        if (
          selectStyles &&
          selectStyles.fill &&
          selectStyles.circle &&
          selectStyles.line
        ) {
          style = selectStyles;
        }

        switch (layerType) {
          case 'fill':
            layerType = 'line';
            paint = style.line.paint;
            break;
          case 'line':
            paint = style.line.paint;
            break;
          case 'circle':
            paint = style.circle.paint;
            break;
          default:
            return null;
        }
        const lyr = layerExists(map, `${layers[i]}-selected`);
        if (!lyr) {
          map.addLayer({
            id: `${layers[i]}-selected`,
            type: layerType,
            source: sourceName,
            paint
          });
        }
      } else {
        const lyr = layerExists(map, `${layers[i]}-selected`);
        if (!lyr) {
          map.addLayer({
            id: `${layers[i]}-selected`,
            type: layerType,
            source: sourceName,
            paint
          });
        }
        map.getSource(sourceName).setData({
          type: 'FeatureCollection',
          features: newSelection[layers[i]]
        });
      }
    }
  }
  setSelectedFeatures(updateObj);
  return true;
}
