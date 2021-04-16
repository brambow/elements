/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { jsx, Box, Link, Image, Text, Button } from 'theme-ui';
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
  const configs = {}; // {layerId: {...config}}
  let busy = false;
  const setBusy = (duration) => {
    busy = true;
    setTimeout(() => {
      busy = false;
    }, duration);
  };

  const createInstance = (showActions, popupContainer, map) => {
    mapInstance = map;
    return (event) => {
      if (busy) {
        return;
      }
      setBusy(10);

      async function buildPopupContents(features) {
        const Pages = [];
        for (let i = 0; i < features.length; i += 1) {
          const feature = features[i];
          let page;
          if (configs[feature.layer.id].intercept) {
            try {
              // eslint-disable-next-line no-await-in-loop
              const properties = await configs[feature.layer.id].intercept(feature.properties);
              page = React.createElement(Container, {
                properties,
                config: configs[feature.layer.id],
                showActions,
                feature: feature || null
              });
            } catch (e) {
              console.error(e);
              page = null;
            }
        } else {
          page = React.createElement(Container, {
            properties: feature.properties,
            config: configs[feature.layer.id],
            showActions,
            feature: feature || null
          });
        } 
          Pages.push(page);
        }

        const ElementsPopup = ({items}) => {
          const [currentItem, setCurrentItem] = useState(items[0]);
          const [currentPage, setCurrentPage] = useState(0);

          const Paginate = () => {
            const nextPage = (e) => {
              e.preventDefault();
              setCurrentItem(items[currentPage + 1]);
              setCurrentPage(currentPage + 1);
            }
            const prevPage = (e) => {
              e.preventDefault();
              setCurrentItem(items[currentPage - 1]);
              setCurrentPage(currentPage - 1);
            }
            return (
              <Box>
                { (currentPage === 0) ? 
                  null : 
                  <Text mr={1} sx={{float: 'left'}}>
                    <Button sx={{padding: '4px 4px', background: 'background'}} href="#" onClick={prevPage}>Previous</Button>
                  </Text> 
                }
                { (currentPage === items.length - 1) ? 
                  null : 
                  <Text mr={1} sx={{float: 'left'}}>
                    <Button sx={{padding: '4px 4px', background: 'background'}} href="#" onClick={nextPage}>Next</Button>
                  </Text> 
                }
                <Text sx={{float: 'right'}} mt='4px'>{currentPage + 1}/{items.length}</Text>
              </Box>
            );
          }

          return (
            <Box>
              {currentItem}
              {(items.length > 1) ? <Paginate />: null}
            </Box>
          );
        }

        ReactDOM.render(<ElementsPopup items={Pages} />, popupContainer);
        new Popup()
          .setLngLat(event.lngLat)
          .setDOMContent(popupContainer)
          .addTo(map);
      }

      const layerIds = Object.keys(configs);
      const features = map.queryRenderedFeatures(event.point, { layers: layerIds });
      buildPopupContents(features);
    };
  };

  return {
    getInstance: (showActions, popupContainer, map, config) => {
      if (!configs[config.layerId]) {
        configs[config.layerId] = { ...config };
      }
      if (!instance) {
        instance = createInstance(showActions, popupContainer, map);
      } else if (map !== mapInstance) {
        instance = createInstance(showActions, popupContainer, map);
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
  const popupContainer = document.createElement('Box');

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
