import React, { useState, useEffect } from 'react';

const buildStyle = lyr => {
  let type = lyr.type;
  let style = lyr.paint._values; //TO DO: think about this, it can throw errors

  // https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers
  switch (type) {
    case 'fill':
      return fill(style);
      break;
    case 'line':
      return line(style);
      break;
    case 'symbol':
      return symbol(lyr.paint);
      break;
    case 'heatmap':
      return heatmap(style);
      break;
    case 'fill-extrusion':
      return fillExtrusion(style);
      break;
    case 'raster':
      return raster(style);
      break;
    case 'hillshade':
      return hillshade(style);
      break;
    case 'background':
      return background(style);
      break;
    default:
      return false;
  }

  // fill-color, fill-opacity, fill-outline-color, fill-pattern
  function fill(val) {
    const fc = val['fill-color'].value.value.toString(); //this breaks if there are data-driven styles
    const foc = val['fill-outline-color'].value.value.toString();
    return (
      <svg width="25" height="25">
        <rect
          x="0"
          y="0"
          rx="5"
          ry="5"
          width="25"
          height="25"
          style={{ fill: fc, borderColor: foc, borderWidth: 3 }}
        />
      </svg>
    );
  }

  // line-cap, line-join, line-opacity, line-color, line-width, line-dasharray, line-gradient
  function line(val) {
    if (val['line-color'].value.kind === 'composite') {
      try {
        const lc = val[
          'line-color'
        ].value._styleExpression.expression.outputs[0].outputs[0].value.toString();
        return (
          <svg width="25" height="25">
            <rect
              x="0"
              y="0"
              rx="0"
              ry="0"
              width="25"
              height="7.5"
              style={{ fill: lc, borderWidth: 3 }}
            />
          </svg>
        );
      } catch (err) {
        console.log('Problem getting line color');
        console.error(err);
        return false;
      }
    } else {
      //todo: determine color from other line types
      return false;
    }
  }

  function symbol(val) {
    console.log('legend cannot render symbol yet');
    return false;
  }

  function heatmap(val) {
    console.log('legend cannot render heatmap yet');
    return false;
  }

  function fillExtrusion(val) {
    console.log('legend cannot render fill-extrusion yet');
    return false;
  }

  function raster(val) {
    console.log('legend cannot render raster yet');
    return false;
  }

  function hillshade(val) {
    console.log('legend cannot render hillshade yet');
    return false;
  }

  function background(val) {
    console.log('legend cannot render background yet');
    return false;
  }
};

export { buildStyle };
