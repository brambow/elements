export default function allowMapInteractions(map, allow) {
  // console.log(map, allow);
  if (allow) {
    map.boxZoom.enable();
    map.scrollZoom.enable();
    map.dragPan.enable();
    map.dragRotate.enable();
    map.keyboard.enable();
    map.doubleClickZoom.enable();
    map.touchZoomRotate.enable();
  } else {
    map.boxZoom.disable();
    map.scrollZoom.disable();
    map.dragPan.disable();
    map.dragRotate.disable();
    map.keyboard.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disable();
  }
  // console.log(map.dragPan);
}
