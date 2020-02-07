/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import Context from '../../DefaultContext';
import { Box, Link, Image, Text } from '@theme-ui/components';
import List from '../_primitives/List';
import ListItem from '../_primitives/ListItem';
import { Popup } from 'mapbox-gl';
import mapExists from '../../util/mapExists';
import PopupActionsMenu from './PopupActionsMenu';

const Container = ({ properties, config, showActions, feature }) => {

  let actionsMenu;
  if (showActions) {
    if (config.actions && config.actions.length > 0) {
      actionsMenu = (
        <PopupActionsMenu popupActions={config.actions} feature={feature} />
      );
    } else {
      console.warn('You passed a showActions prop but no actions');
      actionsMenu = null;
    }
  } else {
    actionsMenu = null;
  }

  return (
      <Box>
        {config.title && config.title.field ? (
          <Title properties={properties} config={config.title} />
        ) : null}
        <Items properties={properties} config={config.attributes} />
        {actionsMenu}
      </Box>
  );
};

const Title = ({ properties, config }) => {
  if (!properties.hasOwnProperty(config.field)) return null;
  return (
    <Box
      sx={{
        fontWeight: 700,
        margin: '0 0 5px 0',
        padding: 0,
        textAlign: 'center',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderColor: 'gray'
      }}
    >
      {properties[config.field]}
    </Box>
  );
};

const Items = ({ properties, config })=> {
  const _text = value => {
    return <Text sx={{display: 'inline'}}>{value}</Text>;
  };

  const _link = value => {
    return (
      <Link href={value} target="_blank" rel="nofollow">
        view link
      </Link>
    );
  };

  const _image = value => {
    return (
      <Link href={value} target="_blank" rel="nofollow">
        <Image
          sx = {{
            minHeight: 100,
            width: '100%',
          }}
          src={value}
        />
      </Link>
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
        <ListItem 
          sx={{
            margin: 0,
            padding: 0,
          }}
          key={idx}>
          <Box>
            <Text
              sx = {{
                display: 'inline',
                fontWeight: 600,
                marginRight: '3px',
                color: 'secondary'
              }}
            >
              {attribute.label}:
            </Text>
            {attribute.expression
              ? _buildValue(
                  attribute.type,
                  attribute.expression(properties[attribute.field])
                )
              : _buildValue(attribute.type, properties[attribute.field])}
          </Box>
        </ListItem>
      );
    });

  return (
    <Box
      sx={{
        maxHeight: '200px',
        overflow: 'scroll',
      }}>
      <List
        sx={{
          margin: 0,
          padding: 0,
          listStyle: 'none'
        }}
      >
        {attributes}
      </List>
    </Box>
  );
};

const MapPopup = ({ panel = false, layers, showActions, disabled }) => {
  const config = useContext(Context);
  const map = config.map;
  const popupContainer = document.createElement('div');

  if (!mapExists(map)) {
    return null;
  }

  if (!disabled) {
    const _build = (config, event) => {
      const feature = event.features[0];
      if (config.intercept) {
        config
          .intercept(feature.properties)
          .then(function(properties) {
            ReactDOM.render(
              React.createElement(Container, {
                properties,
                config,
                showActions,
                feature: feature ? feature : null
              }),
              popupContainer
            );

            new Popup()
              .setLngLat(event.lngLat)
              .setDOMContent(popupContainer)
              .addTo(map);
          })
          .catch(function(err) {
            console.warn(err);
          });
      } else {
        ReactDOM.render(
          React.createElement(Container, {
            properties: feature.properties,
            config,
            showActions,
            feature: feature ? feature : null
          }),
          popupContainer
        );
        new Popup()
          .setLngLat(event.lngLat)
          .setDOMContent(popupContainer)
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
  }

  return null; // no component returned for popup
};

export default MapPopup;
