function mapExists(map) {
  if (map && Object.keys(map).length > 0) {
    if (map.style && Object.keys(map.style).length > 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export default mapExists;
