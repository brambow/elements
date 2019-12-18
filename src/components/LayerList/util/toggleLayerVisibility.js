import mapExists from '../../../util/mapExists';

export default function toggleLayerVisibility(map, layerId, checked) {
  if (!mapExists(map)) return false;
  if (checked) {
    map.setLayoutProperty(layerId, 'visibility', 'visible');
  } else {
    map.setLayoutProperty(layerId, 'visibility', 'none');
  }
}
