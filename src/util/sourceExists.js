function sourceExists(map, sourceName) {
  if (map.getSource(sourceName)) {
    return true;
  } else {
    return false;
  }
}

export default sourceExists;
