import mapExists from '../../../util/mapExists';

function saveBookmark(map, name, setBookmarks) {
  const existingBookmarks = window.localStorage.getItem('ccBookmarks');

  if (mapExists(map) && name) {
    if (!existingBookmarks) {
      const array = [
        {
          name,
          // style: map.getStyle(),
          zoom: map.getZoom(),
          center: map.getCenter()
        }
      ];
      window.localStorage.setItem('ccBookmarks', JSON.stringify(array));
      setBookmarks(array);
    } else {
      const newItem = {
        name,
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

function deleteBookmark(name, setBookmarks) {
  const bookmarks = JSON.parse(window.localStorage.getItem('ccBookmarks')).filter((bookmark) => {
    return JSON.stringify(bookmark) !== JSON.stringify(name);
  });
  window.localStorage.setItem('ccBookmarks', JSON.stringify(bookmarks));
  setBookmarks(bookmarks);
}

export { saveBookmark, deleteBookmark }
