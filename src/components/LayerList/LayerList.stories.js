import React from 'react';

import LayerList from './LayerList';
import Map from '../Map/Map';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs, radios } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';
import mapLayers from '../../util/mockMapLayers';
import { edgeCases } from '../../util/mockMapLayers';

const layers = [
  {
    layerIds: ['national-park'], //fill
    layerName: 'National Parks',
    actions: [
      {
        title: 'Custom Action',
        action: () => {
          alert('insert custom functions here');
        }
      }
    ]
  },
  {
    layerIds: ['water', 'water-shadow'], //fill
    layerName: 'Water',
    actions: [
      {
        title: 'Custom Action',
        action: () => {
          alert('insert custom functions here');
        }
      }
    ]
  },
  {
    layerIds: ['road-motorway-trunk'], //line
    layerName: 'Motorway',
    actions: [
      {
        title: 'Custom Action',
        action: () => {
          alert('insert custom functions here');
        }
      }
    ]
  },
  {
    layerIds: ['road-number-shield'], //symbol
    layerName: 'Road Shield',
    actions: [
      {
        title: 'Custom Action',
        action: () => {
          alert('insert custom functions here');
        }
      }
    ],
    legendStyle: () => {
      return (
        <svg width="25" height="25">
          <rect
            x="0"
            y="0"
            rx="0"
            ry="0"
            width="25"
            height="7.5"
            style={{ fill: 'red', borderWidth: 3 }}
          />
        </svg>
      );
    }
  }
];

const layers2 = [
  {
    layerIds: ['road-motorway-trunk'], //line
    layerName: 'Motorway',
    actions: [
      {
        title: 'Custom Action',
        action: () => {
          alert('insert custom functions here');
        }
      }
    ]
  },
  {
    layerIds: ['road-number-shield'], //symbol
    layerName: 'Road Shield',
    actions: [
      {
        title: 'Custom Action',
        action: () => {
          alert('insert custom functions here');
        }
      }
    ],
    legendStyle: () => {
      return (
        <svg width="25" height="25">
          <rect
            x="0"
            y="0"
            rx="0"
            ry="0"
            width="25"
            height="7.5"
            style={{ fill: 'red', borderWidth: 3 }}
          />
        </svg>
      );
    }
  }
];

const groupLayers = [
  {
    groupName: 'test',
    layers: [
      {
        layerIds: ['national-park'], //fill
        layerName: 'National Parks'
      },
      {
        layerIds: ['water', 'water-shadow'], //fill
        layerName: 'Water'
      }
    ]
  }
];

const layersWithDDS = [
  ...layers,
  {
    layerIds: ['states-layer'], //fill
    layerName: 'US States',
    actions: [
      {
        title: 'Custom Action',
        action: () => {
          alert('insert custom functions here');
        }
      }
    ]
  },
  {
    layerIds: ['dc-art-layer'],
    layerName: 'DC Art Galleries'
  },
  {
    layerIds: ['football-stadiums-layer'],
    layerName: ['Football Stadiums']
  },
  {
    layerIds: ['river-centerlines-layer'],
    layerName: ['River Centerlines']
  }
];

const layerEdgeCases = [
  {
    layerIds: ['edge-expression'],
    layerName: 'Style Expression'
  },
  {
    layerIds: ['edge-categorical-default'],
    layerName: 'Default Style'
  }
]

storiesOf('LayerList', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <LayerList
          baseType={radios('baseType', ['none', 'panel', 'button'], 'panel')}
          layers={layers}
          checkboxStyle={radios(
            'checkboxStyle',
            ['checkbox', 'switch', 'eye'],
            'checkbox'
          )}
        />
      </ElementsProvider>
    );
  })
  .add('With Legend', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <LayerList
          baseType={radios('baseType', ['none', 'panel', 'button'], 'panel')}
          layers={layers}
          legend
          checkboxStyle={radios(
            'checkboxStyle',
            ['checkbox', 'switch', 'eye'],
            'checkbox'
          )}
        />
      </ElementsProvider>
    );
  })
  .add('With Legend (Button Style)', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <LayerList
          baseType='button'
          layers={layers}
          legend
        />
      </ElementsProvider>
    );
  })
  .add('With Data Driven Styles', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} mapLayers={mapLayers} />
        <LayerList
          baseType={radios('baseType', ['none', 'panel', 'button'], 'panel')}
          layers={layersWithDDS}
          legend
          checkboxStyle={radios(
            'checkboxStyle',
            ['checkbox', 'switch', 'eye'],
            'checkbox'
          )}
        />
      </ElementsProvider>
    );
  })
  .add('With Action Menu', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <LayerList
          baseType={radios('baseType', ['none', 'panel', 'button'], 'panel')}
          layers={layers}
          showActions
          checkboxStyle={radios(
            'checkboxStyle',
            ['checkbox', 'switch', 'eye'],
            'checkbox'
          )}
        />
      </ElementsProvider>
    );
  })
  .add('Groups', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <LayerList
          baseType={radios('baseType', ['none', 'panel', 'button'], 'panel')}
          layers={layers2}
          groupLayers={groupLayers}
          checkboxStyle={radios(
            'checkboxStyle',
            ['checkbox', 'switch', 'eye'],
            'checkbox'
          )}
        />
      </ElementsProvider>
    );
  })
  .add('Edge Cases', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} mapLayers={edgeCases} />
        <LayerList
          baseType={radios('baseType', ['none', 'panel', 'button'], 'panel')}
          layers={layerEdgeCases}
          legend
          checkboxStyle={radios(
            'checkboxStyle',
            ['checkbox', 'switch', 'eye'],
            'checkbox'
          )}
        />
      </ElementsProvider>
    );
  });
