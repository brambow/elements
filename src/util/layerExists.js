function layerExists(map, layerName) {
  if (map.getLayer(layerName)) {
    return true;
  } 
    return false;
  
}

export default layerExists;
