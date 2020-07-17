import React, { useContext, useEffect, useState } from 'react';
import { Button, Heading, Flex } from 'theme-ui';
import { MdPlace as PointIcon } from 'react-icons/md';
import { FaDrawPolygon as PolygonIcon } from 'react-icons/fa';
import ButtonGroup from '../_primitives/ButtonGroup';
import BaseComponent from '../_common/BaseComponent';
import Context from '../../DefaultContext';
import mapExists from '../../util/mapExists';
import SelectLayerItem from './SelectLayerItem';
import selectByPoint from './util/selectByPoint';
import selectByPolygon from './util/selectByPolygon';
import List from '../_primitives/List';

const listener = {
  pointEvent: undefined
};
function pointEvent(e) {
  if (listener.pointEvent) {
    listener.pointEvent(e);
  }
}

const Select = ({
  selectableLayers,
  showSelectableLayers,
  onSelectCallback, // callback(selectionShape, selectedFeatures)
  onResetCallback,
  selectStyles,
  panel,
  ...rest
}) => {
  const config = useContext(Context);
  const { map } = config;
  // const [selectActive, setSelectActive] = useState(false);
  // @options:currentMode - off, draw_polygon, draw_point
  const [currentMode, setCurrentMode] = useState('none');
  const [activeSelectLayers, setActiveSelectLayers] = useState(
    selectableLayers
  );
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [selectControl, setSelectControl] = useState();
  const [alert, setAlert] = useState(null);
  const [selectionGeometry, setSelectionGeometry] = useState(null);

  const polyEvent = (e, select) => {
    const polygon = e.features[0];
    setSelectionGeometry(polygon);
    selectByPolygon(
      activeSelectLayers,
      polygon,
      map,
      selectedFeatures,
      setSelectedFeatures,
      selectStyles // optional
    );
    select.deleteAll();
    setCurrentMode('none');
  };

  const startSelect = async (type) => {
    let select = selectControl || false;

    if (!selectControl) {
      select = await import('@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw').then(
        ({ default: MapboxDraw }) =>
          new MapboxDraw({
            displayControlsDefault: false
            // modes: Object.assign(MapboxDraw.modes)
          })
      );
      setSelectControl(select);
      map.addControl(select);
    }

    select.changeMode(type);

    switch (type) {
      case 'draw_point':
        map.on('click', pointEvent);
        return true;
      case 'draw_polygon':
        map.once('draw.create', (e) => {
          polyEvent.call(this, e, select);
        });
        return true;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!mapExists(map)) return;
    if (currentMode === 'none') {
      return;
    }
    startSelect(currentMode);
  }, [currentMode]);

  useEffect(() => {
    if (selectionGeometry) {
      if (Object.keys(selectedFeatures).length > 0) {
        if (onSelectCallback) {
          onSelectCallback(selectionGeometry, selectedFeatures);
        }
      } else if (onSelectCallback) {
        onSelectCallback(null, selectedFeatures);
      }
    }
  }, [selectedFeatures, selectionGeometry]);

  if (!mapExists(map)) return null;

  const toggleSelect = (mode) => {
    map.off('click', pointEvent);
    if (mode === 'none') {
      // setSelectActive(false);
      setCurrentMode('none');
    } else if (currentMode === mode) {
      // setSelectActive(false);
      setCurrentMode('none');
    } else if (activeSelectLayers.length > 0) {
      // setSelectActive(true);
      setCurrentMode(mode);
    } else {
      setAlert(
        <div style={{ color: 'red', margin: 1, padding: 1 }}>
          No layers have been selected!
        </div>
      );
      setCurrentMode('none');
      // eslint-disable-next-line func-names
      setTimeout(function () {
        setAlert(null);
      }, 1000);
    }
  };

  listener.pointEvent = (e) => {
    const { point } = e;
    setSelectionGeometry(point);
    selectByPoint(
      activeSelectLayers,
      point,
      map,
      selectedFeatures,
      setSelectedFeatures,
      selectStyles // optional
    );
    try {
      selectControl.deleteAll();
    } catch (evt) {
      // eslint-disable-next-line no-shadow
      if (evt instanceof TypeError) {
        setCurrentMode('none');
      }
    }
  };

  const resetSelection = () => {
    const layers = Object.keys(selectedFeatures);
    setSelectedFeatures({});
    layers.map((layer) => {
      if (
        map.getSource(`${layer}-selected-src`) &&
        map.getLayer(`${layer}-selected`)
      ) {
        map.removeLayer(`${layer}-selected`);
        map.removeSource(`${layer}-selected-src`);
      }
      return true;
    });
    // setSelectActive(false);
    setCurrentMode('none');
    selectControl.deleteAll();
    onResetCallback();
  };

  let layerOptions = [];
  if (selectableLayers && selectableLayers.length > 0) {
    layerOptions = selectableLayers.map((lyr) => {
      const num = Math.floor(Math.random() * 100);
      return (
        <SelectLayerItem
          key={lyr + num}
          layerName={lyr}
          activeSelectLayers={activeSelectLayers}
          setActiveSelectLayers={setActiveSelectLayers}
        />
      );
    });
  }

  let layersSection;

  if (showSelectableLayers) {
    layersSection = (
      <div>
        <Heading sx={{ mt: 2, fontSize: [1, 2] }}>Selectable Layers</Heading>
        <List>{layerOptions}</List>
      </div>
    );
  } else {
    layersSection = null;
  }

  // use the logic below to accept whether the component should be rendered in a Panel or not.
  const drawButtons = (
    <div>
      <Heading sx={{ marginBottom: 2, fontSize: [1, 2] }}>
        Selection Mode
      </Heading>
      <Flex>
        <ButtonGroup className="select-modes">
          <Button
            disabled={!(activeSelectLayers.length > 0)}
            title="Select By Point"
            className="draw-tool draw-tool--point"
            style={
              currentMode === 'draw_point'
                ? {
                    backgroundColor: 'green',
                    color: 'white'
                  }
                : null
            }
            onClick={() => toggleSelect('draw_point')}
          >
            <PointIcon />
          </Button>
          <Button
            title="Select By Polygon"
            disabled={!(activeSelectLayers.length > 0)}
            className="draw-tool draw-tool--polygon"
            style={
              currentMode === 'draw_polygon'
                ? {
                    backgroundColor: 'green',
                    color: 'white'
                  }
                : null
            }
            onClick={() => toggleSelect('draw_polygon')}
          >
            <PolygonIcon />
          </Button>
          <Button
            title="Reset Selection"
            disabled={
              !(selectedFeatures && Object.keys(selectedFeatures).length > 0)
            }
            onClick={() => {
              resetSelection();
            }}
          >
            Reset
          </Button>
        </ButtonGroup>
      </Flex>
    </div>
  );

  return (
    <BaseComponent panel={panel} {...rest}>
      {drawButtons}
      {alert}
      {layersSection}
    </BaseComponent>
  );
};

export default Select;
