import mapExists from '../../../util/mapExists';

export default function saveBookmark(map, name, setBookmarks) {
  const existingBookmarks = window.localStorage.getItem('ccBookmarks');

  if (mapExists(map) && name) {
    if (!existingBookmarks) {
      const array = [
        {
          name: name,
          // style: map.getStyle(),
          zoom: map.getZoom(),
          center: map.getCenter()
        }
      ];
      window.localStorage.setItem('ccBookmarks', JSON.stringify(array));
      setBookmarks(array);
    } else {
      const newItem = {
        name: name,
        // style: map.getStyle(),
        zoom: map.getZoom(),
        center: map.getCenter()
      };
      const existingArray = JSON.parse(existingBookmarks);
      const newArray = [...existingArray, newItem];
      window.localStorage.setItem('ccBookmarks', JSON.stringify(newArray));
      setBookmarks(newArray);
    }
  }
}
