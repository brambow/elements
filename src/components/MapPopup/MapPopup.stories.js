import React from 'react';
import MapPopup from './MapPopup';
import Map from '../Map/Map';
import ElementsProvider from '../_common/ElementsProvider';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapOptions from '../../util/mockMapOptions';
import mapLayers from '../../util/mockMapLayers';

const customMapOptions = Object.assign({}, mapOptions, {
  center: [-100.207672, 39.581878],
  zoom: 3
});

const popupLayers = [
  {
    layerId: 'dc-art-layer',
    title: {
      field: 'ART_TYPE'
    },
    attributes: [{
      field: 'LOCATION',
      label: 'Location',
      type: 'text'
    }, {
      field: 'ARTIST',
      label: 'Artist',
      type: 'text'
    }, {
      field: 'TITLE',
      label: 'Title',
      type: 'text'
    }]
  },
  {
    layerId: 'football-stadiums-layer',
    title: {
      field: 'name1'
    },
    attributes: [{
      field: 'conference',
      label: 'Conference',
      type: 'text'
    }]
  },
  {
    layerId: 'states-layer', // id of layer on map
    title: {
      field: 'name'
    }, // popup title field
    intercept: async function(properties) {
      // mock getting some external data
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(Object.assign(properties, { source: 'intercept' }));
        }, 250);
      });
    },
    attributes: [
      {
        field: 'wikipedia', // original field name
        label: 'Wiki', // desired label
        type: 'link' // text, link, image
      },
      {
        field: 'source',
        label: 'Source',
        type: 'text'
      },
      {
        field: 'postal',
        label: 'Postal',
        type: 'text'
      },
      {
        field: 'region',
        label: 'Region',
        type: 'text'
      },
      {
        field: 'name',
        label: 'Image',
        type: 'image',
        expression: function(val) {
          return `https://raw.githubusercontent.com/tannerjt/state_images.json/master/images/${val
            .toLowerCase()
            .replace(' ', '_')}.jpg`;
        }
      }
    ],
    actions: [
      {
        title: 'Custom Action',
        action: (feature, setLoading) => {
          setLoading(true);
          setTimeout(() => {
            alert(
              `${feature.properties.name} in the "${feature.layer.id}" map layer `
            );
            setLoading(false);
          }, 1500)
        }
      }
    ]
  }
];

storiesOf('Popup', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={customMapOptions} mapLayers={mapLayers} />
        <MapPopup 
          layers={popupLayers}  
          disabled={boolean('Disabled', false)} />
      </ElementsProvider>
    );
  })
  .add('With Action Menu', () => {
    return (
      <ElementsProvider>
        <Map mapOptions={customMapOptions} mapLayers={mapLayers} />
        <MapPopup 
          layers={popupLayers} 
          disabled={boolean('Disabled', false)}
          showActions />
      </ElementsProvider>
    );
  });
