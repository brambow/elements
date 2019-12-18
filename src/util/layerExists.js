function layerExists(map, layerName) {
  if (map.getLayer(layerName)) {
    return true;
  } else {
    return false;
  }
}

export default layerExists;
