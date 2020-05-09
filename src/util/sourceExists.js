function sourceExists(map, sourceName) {
  if (map.getSource(sourceName)) {
    return true;
  } 
    return false;
  
}

export default sourceExists;
