const geojsonLayer = [{
  'id': 'states-layer',
  'type': 'fill',
  'source': {
    'type': 'geojson',
    'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson'
  },
  'paint': {

    // Single Color
    // 'fill-color': 'rgba(200, 100, 240, 0.4)',

    // Color with stops based on zoom
    // 'fill-color': {
    //   'stops': [[5, 'rgba(238, 75, 106, 0.5)'], [5, 'rgba(233, 196, 106, 0.5)'], [12, 'rgba(3, 29, 68, 0.5)']]
    // },

    // Color with stops based on property
    'fill-color': {
      'property': 'name_len',
      'stops': [
        [5 , 'rgba(254, 229, 217, 0.4)'],
        [7, 'rgba(252, 174, 145, 0.4)'],
        [9, 'rgba(251, 106, 74, 0.4)'],
        [11, 'rgba(203, 24, 29, 0.4)']
      ]
    },

    // Categorical
    // 'fill-color': {
    //   'property': 'name',
    //   'type': 'categorical',
    //   'stops': [
    //     ['Oregon' , 'rgba(254, 229, 217, 0.4)'],
    //     ['South Carolina', 'rgba(252, 174, 145, 0.4)'],
    //     ['Florida', 'rgba(251, 106, 74, 0.4)'],
    //     ['North Carolina', 'rgba(203, 24, 29, 0.4)']
    //   ]
    // },
    
    'fill-outline-color': 'rgba(238, 75, 106, 1)'
  }
}];

export default geojsonLayer;