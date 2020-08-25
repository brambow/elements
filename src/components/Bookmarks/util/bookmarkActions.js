import mapExists from '../../../util/mapExists';

function loadBookmarks() {
  return window.localStorage.getItem('ccBookmarks');
}

function goToBookmark(map, bookmark) {
  if (!mapExists(map)) return false;
  map.easeTo({
    center: bookmark.center,
    zoom: bookmark.zoom
  });
  return true;
}

function saveBookmark(map, name, setBookmarks) {
  const existingBookmarks = loadBookmarks();

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
  const bookmarks = JSON.parse(loadBookmarks()).filter((bookmark) => {
    return JSON.stringify(bookmark) !== JSON.stringify(name);
  });
  window.localStorage.setItem('ccBookmarks', JSON.stringify(bookmarks));
  setBookmarks(bookmarks);
}

export { goToBookmark, loadBookmarks, saveBookmark, deleteBookmark }
