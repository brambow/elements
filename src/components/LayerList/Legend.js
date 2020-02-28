/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import React from 'react';
import { Box, Text } from '@theme-ui/components';
import List from '../_primitives/List';
import ListItem from '../_primitives/ListItem';

const buildStyle = lyr => {

  let type = lyr.type;

  // https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers
  try {
    switch (type) {
      case 'fill':
        return fill(lyr.paint);
      case 'circle':
        return circle(lyr.paint);
      case 'line':
        return line(lyr.paint);
      case 'symbol':
        return symbol(lyr.paint);
      case 'heatmap':
        return heatmap(lyr.paint);
      case 'fill-extrusion':
        return fillExtrusion(lyr.paint);
      case 'raster':
        return raster(lyr.paint);
      case 'hillshade':
        return hillshade(lyr.paint);
      case 'background':
        return background(lyr.paint);
      default:
        return false;
    } 
  } catch (err) {
    // top level error handling.... better just to render nothing
    console.warn(err);
    return false;
  }

  // fill-color, fill-opacity, fill-outline-color, fill-pattern
  function fill(paint) {
    let fc, foc;

    // Is this a data driven paint style?
    if(paint.get('fill-color').value._parameters && paint.get('fill-color').value._parameters.hasOwnProperty('stops')) {
      // fc = paint.get('fill-color').value._parameters.stops.map((s) => {
      //   return [s[0], s[1]];
      // });
      fc = paint.get('fill-color').value._parameters.stops;
    } else {
      fc = [paint.get('fill-color').value.value.toString()];
    }

    if(paint.get('fill-outline-color').value._parameters && paint.get('fill-outline-color').value._parameters.hasOwnProperty('stops')) {
      // foc = paint.get('fill-outline-color').value._parameters.stops.map((s) => {
      //   return [s[0], s[1]];
      // });
      foc = paint.get('fill-outline-color').value._parameters.stops;
    } else {
      foc = [paint.get('fill-outline-color').value.value.toString()];
    }

    const Items = () => {
      let styles = [];
      if((fc.length > 2)) {
        styles = fc.map((l) => {
          return [...l, foc[0]];
        });
      } else if((foc.length) > 2) {
        styles = foc.map((l) => {
          return [...l, fc[0]];
        });
      } else {
        styles = [[null, fc[0], foc[0]]];
      }
      
      const svgs = styles.map((s, i) => {
        return(
          <ListItem key={i} sx={{
            margin: 0,
            padding: 0,
            display: 'flex'
          }}>
            <Box>
            <svg width="25" height="25">
              <rect
                x="0"
                y="0"
                rx="5"
                ry="5"
                width="25"
                height="25"
                sx={{ fill: s[1], stroke: s[2], strokeWidth: 3 }}
              />
            </svg> 
            </Box>
            <Box>
              <Text sx={{ padding: '3px' }}>
                {s[0]}
              </Text>
            </Box>
          </ListItem>
        )
      })

      return(
        <Box>
          {svgs}
        </Box>
      )
    }

    return (
      <List sx={{
        margin: 0,
        padding: 0,
      }}>
        <Items />
      </List>
    );
  }

  // common style characteristics
  // circle-color, circle-opacity, circle-stroke-color, circle-stroke-opacity
  function circle(paint) {
    try {
      let cc, csc; // circle-color, circle-stroke-color
      cc = paint.get('circle-color');
      csc = paint.get('circle-stroke-color');
      console.log(cc)
      return (
        <List sx={{
          margin: 0,
          padding: 0,
        }}>
          <ListItem sx={{
            margin: 0,
            padding: 0,
          }}>
            <svg width="25" height="25">
              <circle 
                cx="12.5"
                cy="12.5"
                r="12"
                sx={{
                  fill: cc.value.value.toString(),
                  stroke: csc.value.value.toString()
                }}
              />
            </svg>
          </ListItem>
        </List>
      )
    } catch (err) {
      console.warn(err);
    }
  }

  // line-cap, line-join, line-opacity, line-color, line-width, line-dasharray, line-gradient
  function line(paint) {
    if (paint.get('line-color').value.kind === 'composite') {
      try {
        const lc = paint.get('line-color').value._styleExpression
          .expression.outputs[0].outputs[0].value.toString();
        return (
          <List sx={{
            margin: 0,
            padding: 0,
          }}>
            <ListItem sx={{ margin:0, padding: 0 }}>
              <svg width="25" height="25">
                <rect
                  x="0"
                  y="0"
                  rx="0"
                  ry="0"
                  width="25"
                  height="7.5"
                  sx={{ fill: lc, strokeWidth: 2 }}
                />
              </svg>
            </ListItem>
          </List>
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
