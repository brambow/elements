import { React, useState, useEffect, useContext } from 'react';
import { Flex, Button, Box, Text, Select } from 'theme-ui';
import { MdTimeline as LineIcon } from 'react-icons/md';
import {
  FaDrawPolygon as PolygonIcon,
  FaRuler,
  FaTrash as TrashIcon
} from 'react-icons/fa';
import numeral from 'numeral';

import ButtonGroup from '../_primitives/ButtonGroup';
import Context from '../../DefaultContext';
import mapExists from '../../util/mapExists';
import calculateMeasurements from './calculateMeasurements';
import BaseComponent from '../_common/BaseComponent';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const Measure = ({ baseType, buttonOptions, sx, ...rest }) => {
  const config = useContext(Context);
  const { map } = config;
  const [measureControl, setMeasureControl] = useState(null);
  const [areaPopupOpen, setAreaPopupOpen] = useState(false);
  const [linePopupOpen, setLinePopupOpen] = useState(false);
  const [measurement, setMeasurement] = useState(0);
  const [units, setUnits] = useState('m');
  const [showDelete, setShowDelete] = useState(false);

  const lengthOptions = ['m', 'ft', 'km', 'mi'];
  const areaOptions = ['m²', 'ft²', 'km²', 'mi²', 'ac'];

  async function handleMeasurement() {
    if (measureControl) {
      const { features } = measureControl.getAll();

      if (features && features.length > 0) {
        const feature = features[0];

        const drawnMeasurements = await calculateMeasurements(feature, units); //eslint-disable-line

        setMeasurement(drawnMeasurements);
        // setLinePopupOpen(true);
      }
    }
  }

  useEffect(() => {
    handleMeasurement();
  }, [units]);

  if (!mapExists(map)) {
    return null;
  }

  const changeUnits = (e) => {
    setUnits(e.currentTarget.value);
  };

  async function startDraw(type) {
    // console.log(`start measure ${type}`);
    if (!mapExists(map)) return;
    let measure = measureControl || false;

    if (!measureControl) {
      measure = await import('@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw').then(
        ({ default: MapboxDraw }) =>
          new MapboxDraw({
            displayControlsDefault: false
            // modes: MapboxDraw.modes
          })
      );

      setMeasureControl(measure);
      map.addControl(measure);
    }

    measure.changeMode(type);

    if (type === 'draw_line_string') {
      setUnits('m');
    } else if (type === 'draw_polygon') {
      setUnits('mÂ²');
    }
    setShowDelete(true);
  }

  function reset() {
    measureControl.deleteAll();
    setMeasurement(0);
    measureControl.changeMode('simple_select');
    setShowDelete(false);
    setAreaPopupOpen(false);
    setLinePopupOpen(false);
  }

  // map.on('draw.create', (e) => {
  //   // if (measureControl) {
  //   //   setTimeout(function() {
  //   //     measureControl.deleteAll();
  //   //   }, 2000);
  //   // }
  // });

  map.on('draw.render', (/* e */) => {
    handleMeasurement();
  });

  let deleteButton;

  if (showDelete) {
    deleteButton = (
      <Button
        title="Delete Measurement"
        className="draw-tool draw-tool--delete"
        onClick={() => {
          reset();
        }}
      >
        <TrashIcon />
      </Button>
    );
  }

  const display = linePopupOpen || areaPopupOpen ? 'block' : 'none';
  let displayContent;

  if (linePopupOpen && !areaPopupOpen) {
    displayContent = (
      <Flex>
        <Box>{`${numeral(measurement).format('0,0.00')}`}</Box>
        <Select
          name="measure-units"
          sx={{
            position: 'relative',
            width: 55,
            border: 'none',
            paddingTop: 0
          }}
          onChange={changeUnits}
          defaultValue={lengthOptions[0]}
        >
          {lengthOptions.map((option) => (
            <option key={option} sx={{ color: 'text' }}>
              {option}
            </option>
          ))}
        </Select>
      </Flex>
    );
  } else if (!linePopupOpen && areaPopupOpen) {
    displayContent = (
      <Flex>
        <Box sx={{ color: 'background' }}>{`${numeral(measurement).format(
          '0,0.00'
        )}`}</Box>
        <Select
          name="measure-units"
          sx={{
            color: 'background',
            position: 'relative',
            width: 55,
            border: 'none',
            paddingTop: 0
          }}
          onChange={changeUnits}
          defaultValue={areaOptions[0]}
        >
          {areaOptions.map((option) => (
            <option key={option} sx={{ color: 'text' }}>
              {option}
            </option>
          ))}
        </Select>
      </Flex>
    );
  }

  return (
    <BaseComponent
      className="cl-measure-tools"
      baseType={baseType || 'none'}
      sx={sx}
      buttonOptions={{
        icon: <FaRuler />,
        title: 'Measure',
        testId: 'cl-measure-btn',
        ...buttonOptions
      }}
      {...rest}
    >
      <ButtonGroup>
        <Button
          height={33.5}
          // sx={{ height: '33.5px' }}
          className="draw-tool"
          onClick={() => {
            measureControl.changeMode('simple_select');
            setLinePopupOpen(false);
            setAreaPopupOpen(false);
          }}
        >
          <Text sx={{ fontSize: '12px' }}>Measure</Text>
        </Button>
        <Button
          title="Measure Line"
          className="draw-tool draw-tool--line"
          onClick={() => {
            startDraw('draw_line_string');
            setLinePopupOpen(true);
            setAreaPopupOpen(false);
          }}
        >
          <LineIcon />
        </Button>
        <Button
          title="Measure Area"
          className="draw-tool draw-tool--polygon"
          onClick={() => {
            startDraw('draw_polygon');
            setAreaPopupOpen(true);
            setLinePopupOpen(false);
          }}
        >
          <PolygonIcon />
        </Button>
        {deleteButton}
      </ButtonGroup>
      <Box
        bg="primary"
        p={2}
        color="background"
        height="32px"
        width={135}
        sx={{
          display,
          borderColor: 'white',
          borderWidth: 1,
          borderStyle: 'solid'
        }}
      >
        {displayContent}
      </Box>
    </BaseComponent>
  );
};

export default Measure;
