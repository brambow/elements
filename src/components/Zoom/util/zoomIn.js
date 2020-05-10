import mapExists from '../../../util/mapExists';

export default function zoomIn(map) {
  if (!mapExists(map)) return false;
  const currentZoom = Math.round(map.getZoom());
  map.setZoom(currentZoom + 1);
  return true;
}
