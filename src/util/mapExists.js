function mapExists(map) {
  if (map && Object.keys(map).length > 0) {
    if (map.style && Object.keys(map.style).length > 0) {
      return true;
    } 
      return false;
    
  } 
    return false;
  
}

export default mapExists;
