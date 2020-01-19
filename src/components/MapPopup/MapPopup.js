import React, { useContext } from 'react';
import ReactDOMServer from 'react-dom/server';
import Context from '../../DefaultContext';
import { Box } from '@theme-ui/components';
import { Popup } from 'mapbox-gl';
import mapExists from '../../util/mapExists';

const Container = props => {
  const { styles, properties, config } = props;
  return (
    <Box className="popup-container">
      {config.title && config.title.field ? (
        <Title properties={properties} config={config.title} />
      ) : null}
      <List style={styles} properties={properties} config={config.attributes} />
    </Box>
  );
};

const Title = props => {
  const { properties, config } = props;
  if (!properties.hasOwnProperty(config.field)) return null;
  return (
    <Box
      {...props}
      sx={{
        fontWeight: 700,
        margin: '0 0 5px 0',
        padding: 0,
        textAlign: 'center',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderColor: 'gray'
      }}
      className="popup-title"
    >
      {properties[config.field]}
    </Box>
  );
};

const List = props => {
  const { properties, config } = props;
  const _text = value => {
    return <span className="popup-type-text">{value}</span>;
  };

  const _link = value => {
    return (
      <span className="popup-type-link">
        <a href={value} target="_blank" rel="nofollow">
          view link
        </a>
      </span>
    );
  };

  const _image = value => {
    return (
      <span className="popup-type-image">
        <a href={value} target="_blank" rel="nofollow">
          <img
            className="popup-img"
            style={{ minHeight: 100, width: '100%' }}
            src={value}
          />
        </a>
      </span>
    );
  };

  const _buildValue = (type, value) => {
    switch (type) {
      case 'text':
        return _text(value);
        break;
      case 'link':
        return _link(value);
        break;
      case 'image':
        return _image(value);
        break;
    }
  };

  const attributes = config
    .filter(attribute => {
      // is there a valid value in feature properties
      return properties[attribute.field];
    })
    .map((attribute, idx) => {
      return (
        <li className="popup-list-item" key={idx}>
          <span
            className="list-strong"
            style={{ fontWeight: 600, marginRight: '3px' }}
          >
            {attribute.label}:
          </span>
          {attribute.expression
            ? _buildValue(
                attribute.type,
                attribute.expression(properties[attribute.field])
              )
            : _buildValue(attribute.type, properties[attribute.field])}
        </li>
      );
    });

  return (
    <ul
      style={{ margin: 0, padding: 0, listStyle: 'none' }}
      className="popup-list"
    >
      {attributes}
    </ul>
  );
};

const MapPopup = props => {
  const { layers } = props;
  const config = useContext(Context);
  const map = config.map;

  if (!mapExists(map)) {
    return null;
  }

  const _build = (config, event) => {
    if (config.intercept) {
      config
        .intercept(event.features[0].properties)
        .then(function(properties) {
          new Popup()
            .setLngLat(event.lngLat)
            .setHTML(
              ReactDOMServer.renderToString(
                <Container properties={properties} config={config} />
              )
            )
            .addTo(map);
        })
        .catch(function(err) {
          console.warn(err);
        });
    } else {
      new Popup()
        .setLngLat(event.lngLat)
        .setHTML(
          ReactDOMServer.renderToString(
            <Container
              properties={event.features[0].properties}
              config={config}
            />
          )
        )
        .addTo(map);
    }
  };

  // register map click event for popup
  const _registerEvent = config => {
    try {
      map.off('click', config.layerId, _build.bind(this, config));
      map.on('click', config.layerId, _build.bind(this, config));
    } catch (err) {
      // map has not loaded yet.
      // console.warn(err);
    }
  };

  // REGISTER popup
  // FOR EACH layer in configuration
  layers.forEach(config => {
    _registerEvent(config);
  });

  return null; // no component returned for popup
};

export default MapPopup;
