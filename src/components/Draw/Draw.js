/* eslint-disable no-param-reassign */

import React, { useState, useContext } from 'react';
import { Button } from 'theme-ui';
import {
  MdDelete as DeleteIcon,
  MdPlace as PointIcon,
  MdTimeline as LineIcon,
  MdTextFormat as TextIcon
} from 'react-icons/md';
import { FaDrawPolygon as PolygonIcon } from 'react-icons/fa';

import { useTheme } from 'emotion-theming'
import ButtonGroup from '../_primitives/ButtonGroup';
import Context from '../../DefaultContext';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import mapExists from '../../util/mapExists';

import GetTextMode from './textDrawMode';
import StaticMode from './staticDrawMode';
import allowMapInteractions from './allowMapInteractions';
import BaseComponent from '../_common/BaseComponent';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';

const Draw = ({ sx, ...rest }) => {
  const theme = useTheme()

  const config = useContext(Context);
  const { map } = config;
  const [drawControl, setDrawControl] = useState(null);
  const [nextMode, setNextMode] = useState(null);

  if (!mapExists(map)) {
    return null;
  }

  async function startDraw(type) {
    // console.log(`start drawing ${type}`);

    const draw =
      drawControl ||
      (await import('@mapbox/mapbox-gl-draw').then(
        ({ default: MapboxDraw }) =>
          new MapboxDraw({
            displayControlsDefault: false,
            // eslint-disable-next-line prefer-object-spread
            modes: Object.assign(
              {
                draw_text: GetTextMode(theme),
                static: StaticMode
              },
              MapboxDraw.modes
            )
          })
      ));

    if (!drawControl) {
      setDrawControl(draw);
      map.addControl(draw);
    }

    const nm = type || 'simple_select';
    setNextMode(nm);
    draw.changeMode(nm);
  }

  function clearDrawings() {
    if (drawControl) {
      drawControl.deleteAll();
      const el = document.getElementsByClassName('cc-draw-text');
      while (el.length > 0) {
        el[0].remove();
      }
    }
  }

  function hideTextArea(textEl) {
    textEl.addEventListener('click', (/* e */) => {
      allowMapInteractions(map, false);
    });
    textEl.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    textEl.style.borderStyle = 'none';
    textEl.style.fontSize = '14px';
    textEl.style.textShadow = '0 0 2px #FFFFFF';
    textEl.style.textStroke = '.02em #FFFFFF';
    textEl.style.webkitTextStroke = '.02em #FFFFFF';
    textEl.style.resize = 'none';
  }

  function showTextArea(textEl) {
    textEl.style.backgroundColor = '#FFFFFF';
    textEl.style.borderStyle = 'inset';
    // textEl.style.resize = 'both';
    textEl.focus();
  }

  map.on('draw.create', (/* e */) => {
    // console.log(nextMode);
    if (nextMode === 'draw_text') {
      // console.log('show text!');
      const el = document.getElementsByClassName('cc-draw-text');
      // console.log(el);

      for (let i = 0; i < el.length; i += 1) {
        el[i].focus();
        el[i].addEventListener('click', () => {
          // console.log('click');
          drawControl.changeMode('static');
          showTextArea(el[i]);
        });
      }

      // eslint-disable-next-line no-restricted-globals
      addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
          if (drawControl.getMode() === 'static') {
            drawControl.changeMode('simple_select');
            allowMapInteractions(map, true);
          }
          hideTextArea(el[el.length - 1]);
        }
      });
      // eslint-disable-next-line no-restricted-globals
      addEventListener('dblclick', () => {
        if (drawControl.getMode() === 'static') {
          drawControl.changeMode('simple_select');
          allowMapInteractions(map, true);
        }
        hideTextArea(el[el.length - 1]);
      });
    }
  });

  return (
    <BaseComponent
      {...rest}
      className="draw-tools"
      sx={{
        padding: 0,
        ...sx
      }}
    >
      <ButtonGroup>
        <Button
          title="Draw Point"
          className="draw-tool draw-tool--point"
          onClick={() => startDraw('draw_point')}
        >
          <PointIcon />
        </Button>
        <Button
          title="Draw Line"
          className="draw-tool draw-tool--line"
          onClick={() => startDraw('draw_line_string')}
        >
          <LineIcon />
        </Button>
        <Button
          title="Draw Polygon"
          className="draw-tool draw-tool--polygon"
          onClick={() => startDraw('draw_polygon')}
        >
          <PolygonIcon />
        </Button>
        <Button
          title="Draw Text"
          className="draw-tool draw-tool--text"
          onClick={() => {
            startDraw('draw_text');
          }}
        >
          <TextIcon />
        </Button>
        <Button
          title="Delete Drawing"
          className="draw-tool draw-tool--delete"
          onClick={() => {
            clearDrawings();
          }}
        >
          <DeleteIcon />
        </Button>
      </ButtonGroup>
    </BaseComponent>
  );
};

export default Draw;
