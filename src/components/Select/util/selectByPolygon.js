import sourceExists from '../../../util/sourceExists';
import layerExists from '../../../util/layerExists';
import disjoint from '@turf/boolean-disjoint';
import selectStyles from '../util/selectStyles';

export default function selectByPolygon(
  layers,
  polygon,
  map,
  existingSelection,
  setSelectedFeatures
) {
  var updateObj = {};
  for (let i = 0; i < layers.length; i++) {
    //for each layer initialize an empty array of feature
    let selectedFeatures = [];

    //get rendered features for each selectable layer
    const lyrFeatures = map.queryRenderedFeatures(null, {
      layers: [layers[i]]
    });

    for (let i = 0; i < lyrFeatures.length; i++) {
      try {
        const disjointed = disjoint(lyrFeatures[i], polygon);
        if (!disjointed) {
          selectedFeatures.push(lyrFeatures[i]);
        }
      } catch (err) {
        console.error(err);
      }
    }

    //filter selected features array to dedpulicate
    //hard problem: https://github.com/mapbox/mapbox-gl-js/issues/3099
    //we do it based on matching stringified properties object, doesn't work perfectly
    const stringArray = selectedFeatures.map(feat => {
      return JSON.stringify(feat);
    });

    const uniqStrArray = [...new Set(stringArray)];

    selectedFeatures = uniqStrArray.map(item => {
      return JSON.parse(item);
    });
    //end deduplication attempt

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
          [layers[i]]: [...existingSelection[layers[i]], ...selectedFeatures]
        };
      }

      let layerType = selectedFeatures[0].layer.type;
      const sourceName = `${layers[i]}-selected-src`;

      const src = sourceExists(map, sourceName);
      if (!src) {
        map.addSource(sourceName, {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: selectedFeatures }
        });

        let paint;
        switch (layerType) {
          case 'fill':
            //style fill layer selections with line
            layerType = 'line';
            paint = selectStyles.line.paint;
            break;
          case 'line':
            paint = selectStyles.line.paint;
            break;
          case 'circle':
            paint = selectStyles.circle.paint;
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
            paint: paint
          });
        }
      } else {
        map.getSource(sourceName).setData({
          type: 'FeatureCollection',
          features: newSelection[layers[i]]
        });
      }
    }
  }
  setSelectedFeatures(updateObj);
}
