const geojsonLayer = [{
  'id': 'states-layer',
  'type': 'fill',
  'source': {
    'type': 'geojson',
    'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson'
  },
  'paint': {
    'fill-color': 'rgba(200, 100, 240, 0.4)',
    'fill-outline-color': 'rgba(200, 100, 240, 1)'
  }
}];

export default geojsonLayer;