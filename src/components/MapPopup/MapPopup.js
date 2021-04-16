/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { jsx, Box, Link, Image, Text, Spinner } from 'theme-ui';
import { Popup } from 'mapbox-gl';
import Context from '../../DefaultContext';
import List from '../_primitives/List';
import ListItem from '../_primitives/ListItem';
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
  if (!Object.prototype.hasOwnProperty.call(properties, config.field))
    return null;
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

const Items = ({ properties, config }) => {
  const setText = (value) => {
    return <Text sx={{ display: 'inline' }}>{value}</Text>;
  };

  const setLink = (value) => {
    return (
      <Link href={value} target="_blank" rel="nofollow">
        view link
      </Link>
    );
  };

  const setImage = (value) => {
    return (
      <Link href={value} target="_blank" rel="nofollow">
        <Image
          sx={{
            minHeight: 100,
            width: '100%'
          }}
          src={value}
        />
      </Link>
    );
  };

  const buildValue = (type, value) => {
    switch (type) {
      case 'text':
        return setText(value);
      case 'link':
        return setLink(value);
      case 'image':
        return setImage(value);
      default:
        return false;
    }
  };

  const attributes = config
    .filter((attribute) => {
      // is there a valid value in feature properties
      return properties[attribute.field];
    })
    .map((attribute) => {
      const label = attribute.label ? `${attribute.label}:` : null;
      return (
        <ListItem
          sx={{
            margin: 0,
            padding: 0
          }}
          key={attribute.label}
        >
          <Box>
            <Text
              sx={{
                display: 'inline',
                fontWeight: 600,
                marginRight: '3px',
                color: 'secondary'
              }}
            >
              {label}
            </Text>
            {attribute.expression
              ? buildValue(
                  attribute.type,
                  attribute.expression(properties[attribute.field])
                )
              : buildValue(attribute.type, properties[attribute.field])}
          </Box>
        </ListItem>
      );
    });

  return (
    <Box
      sx={{
        maxHeight: '250px',
        overflowY: 'auto',
        overflowX: 'auto'
      }}
    >
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

// Singleton To Point to Same Function In Memory
const mPopup = (() => {
  let instance;
  let mapInstance;
  // let showActions;
  // let popupContainer;
  // let map;
  // let config;
  const configs = {}; // {layerId: {...config}}
  let busy = false;
  const setBusy = (duration) => {
    busy = true;
    setTimeout(() => {
      busy = false;
    }, duration);
  };

  const createInstance = (showActions, popupContainer, map, config) => {
    mapInstance = map;
    // showActions = showActions;
    // popupContainer = popupContainer;
    // map = map;
    // config = config;
    return (event) => {
      if (busy) {
        return;
      }
      setBusy(10);
      const feature = event.features[0];
      // eslint-disable-next-line no-param-reassign
      config = configs[feature.layer.id];
      if (config.intercept) {
        // Initial render loading icon
        ReactDOM.render(
          <Box>
            <Spinner />
          </Box>,
          popupContainer
        );

        const mapPopup = new Popup()
          .setLngLat(event.lngLat)
          .setDOMContent(popupContainer)
          .addTo(map);

        config
          .intercept(feature.properties)
          .then(function (properties) {
            ReactDOM.render(
              React.createElement(Container, {
                properties,
                config,
                showActions,
                feature: feature || null
              }),
              popupContainer
            );
            mapPopup.setDOMContent(popupContainer);
          })
          .catch(function (err) {
            console.warn(err);
          });
      } else {
        ReactDOM.render(
          React.createElement(Container, {
            properties: feature.properties,
            config,
            showActions,
            feature: feature || null
          }),
          popupContainer
        );

        new Popup()
          .setLngLat(event.lngLat)
          .setDOMContent(popupContainer)
          .addTo(map);
      }
    };
  };

  return {
    getInstance: (showActions, popupContainer, map, config) => {
      if (!configs[config.layerId]) {
        configs[config.layerId] = { ...config };
      }
      if (!instance) {
        instance = createInstance(showActions, popupContainer, map, config);
      } else if (map !== mapInstance) {
        instance = createInstance(showActions, popupContainer, map, config);
      }
      return instance;
    },
    created: () => {
      if (!instance) {
        return false;
      }
      return true;
    }
  };
})();

const MapPopup = ({ layers, showActions, disabled }) => {
  const config = useContext(Context);
  const { map } = config;
  const popupContainer = document.createElement('div');

  if (!mapExists(map)) {
    return null;
  }

  // register map click event for popup
  const registerEvent = (cfg) => {
    const popup = mPopup.getInstance(showActions, popupContainer, map, cfg);
    try {
      map.off('click', cfg.layerId, popup);
      map.on('click', cfg.layerId, popup);
    } catch (err) {
      // map has not loaded yet.
      // console.warn(err);
    }
  };

  const deregisterEvent = (cfg) => {
    const popup = mPopup.getInstance(showActions, popupContainer, map, cfg);
    try {
      map.off('click', cfg.layerId, popup);
    } catch (err) {
      // map has not loaded yet.
      // console.warn(err);
    }
  };

  if (disabled) {
    // Unregister any click events
    if (mPopup.created()) {
      layers.forEach((cfg) => {
        deregisterEvent(cfg);
      });
    }
  } else {
    if (mPopup.created()) {
      // reset any existing events
      layers.forEach((cfg) => {
        deregisterEvent(cfg);
      });
    }
    // initial register
    layers.forEach((cfg) => {
      registerEvent(cfg);
    });
  }

  return null; // no component returned for popup
};

export default MapPopup;
