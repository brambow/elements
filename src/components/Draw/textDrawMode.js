// custom text mode for mapbox draw
import mapboxgl from 'mapbox-gl';
import React from 'react';
import ReactDOM from 'react-dom';
import LabelMaker from './LabelMaker';

const GetTextMode = (theme) => {

  const TextMode = {};
  
  // /**
  //  * @param {String} HTML representing a single element
  //  * @return {Element}
  //  */
  function htmlToElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
    return template.content.firstChild;
  }
  
  // When the mode starts this function will be called.
  // The `opts` argument comes from `draw.changeMode('lotsofpoints', {count:7})`.
  // The value returned should be an object and will be passed to all other lifecycle functions
  TextMode.onSetup = function (/* opts */) {
    const state = {};
    // state.count = opts.count || 0;
    return state;
  };
  
  // Whenever a user clicks on the map, Draw will call `onClick`
  TextMode.onClick = function (state, e) {
    // `this.newFeature` takes geojson and makes a DrawFeature
    const point = this.newFeature({
      type: 'Feature',
      // properties: {
      //   count: state.count
      // },
      geometry: {
        type: 'Point',
        coordinates: [e.lngLat.lng, e.lngLat.lat]
      }
    });
    // this.addFeature(point); // puts the point on the map
  
    const marker = new mapboxgl.Marker({
      element: htmlToElement(
        // `<input class='cc-draw-text' style='text-align: center;' onkeypress="this.style.width = ((this.value.length + 1) * 8) + 'px';" />`
        `<p class="lp-label" style="text-shadow:0 0 4px #FFFFFF;text-stroke: .1em #FFFFFF; webkit-text-stroke = .1em #FFFFFF; cursor: context-menu" title="Right click to edit label style">New Label</p>`
        ),
      // element: document.createElement('input'),
      draggable: true
    });
  
    marker.getElement().addEventListener('contextmenu', (clickEvent) => {
      const exists = document.getElementById('label-maker');
      if (exists) {
        exists.parentNode.removeChild(exists);
      }
      const container = document.createElement('div');
      container.id = 'label-maker';
      document.body.appendChild(container);
      ReactDOM.render(<LabelMaker x={clickEvent.clientX + 50} y={clickEvent.clientY + 25} target={clickEvent.target} theme={theme} />, container);
    })
  
    marker.setLngLat(e.lngLat);
    marker.addTo(this.map);
  
    this.map.fire('draw.create', {
      features: [point.toGeoJSON()]
    });
  
    this.changeMode('simple_select');
  };
  
  // Whenever a user clicks on a key while focused on the map, it will be sent here
  TextMode.onKeyUp = function (state, e) {
    if (e.keyCode === 27) return this.changeMode('simple_select');
    return false;
  };
  
  // This is the only required function for a mode.
  // It decides which features currently in Draw's data store will be rendered on the map.
  // All features passed to `display` will be rendered, so you can pass multiple display features per internal feature.
  // See `styling-draw` in `API.md` for advice on making display features
  TextMode.toDisplayFeatures = function (state, geojson, display) {
    display(geojson);
  };

  return TextMode;
}


export default GetTextMode;
