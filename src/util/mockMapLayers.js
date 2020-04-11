// Fill Layer
const statesLayer = {
  'id': 'states-layer',
  'type': 'fill',
  'source': {
    'type': 'geojson',
    'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson'
  },
  'paint': {
    'fill-color': {
      'property': 'name_len',
      'stops': [
        [5 , 'rgba(254, 229, 217, 0.4)'],
        [7, 'rgba(252, 174, 145, 0.4)'],
        [9, 'rgba(251, 106, 74, 0.4)'],
        [11, 'rgba(203, 24, 29, 0.4)']
      ]
    },
    'fill-outline-color': 'rgba(238, 75, 106, 1)'
  }
}

// Point Layer
const dcArtLayer = {
  'id': 'dc-art-layer',
  'type': 'circle',
  'source': {
    'type': 'geojson',
    'data': 'https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/washington-dc-public-art.geojson'
  },
  'paint': {
    'circle-radius': 8,
    'circle-color': '#B42222'
  }
}

// Graduated Circles Layer
const footballStadiums = {
  'id': 'football-stadiums-layer',
  'type': 'circle',
  'source': {
    'type': 'geojson',
    'data': 'https://gist.githubusercontent.com/rajinwonderland/80b3ac9c7dc75337594fb5e711e461a7/raw/6cf57ddbe377b652345a5a44bdf0c420693ef32d/stadiums.geojson'
  },
  paint: {
    "circle-radius": {
      'property': 'capacity',
      stops: [
        [60000, 5],
        [65000, 10],
        [70000, 20],
        [75000, 30]
      ]
    },
    'circle-opacity': 0.8,
    'circle-color': '#d3be1e'
  }

};

const layers = [statesLayer, dcArtLayer, footballStadiums];

export default layers;