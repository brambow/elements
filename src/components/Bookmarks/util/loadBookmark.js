import mapExists from '../../../util/mapExists';

export default function loadBookmark(map, bookmark) {
  if (!mapExists(map)) return false;
  map.easeTo({
    center: bookmark.center,
    zoom: bookmark.zoom
  });
}
