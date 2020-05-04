import React from 'react';
import LayerList from './LayerList';
import Map from '../Map/Map';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';
import mapLayers from '../../util/mockMapLayers';

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

storiesOf('LayerList', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <LayerList right="1rem" layers={layers} panel={true} />
      </ElementsProvider>
    );
  })
  .add('With Legend', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <LayerList layers={layers} legend panel={true} />
      </ElementsProvider>
    );
  })
  .add('With Data Driven Styles', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} mapLayers={mapLayers} />
        <LayerList layers={layersWithDDS} legend panel={true} />
      </ElementsProvider>
    );
  })
  .add('With Action Menu', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <LayerList layers={layers} showActions panel={true} />
      </ElementsProvider>
    );
  })
  .add('Groups', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={mapOptions} />
        <LayerList layers={layers2} groupLayers={groupLayers} panel={true} />
      </ElementsProvider>
    );
  });
