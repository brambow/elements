/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import React from 'react';
import { Box, Text } from 'theme-ui';
import List from '../_primitives/List';
import ListItem from '../_primitives/ListItem';

const buildStyle = lyr => {
  const {type} = lyr;

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
    let fc; let foc;

    // Is this a data driven paint style?
    if (
      paint.get('fill-color').value._parameters &&
      paint.get('fill-color').value._parameters.hasOwnProperty('stops')
    ) {
      // fc = paint.get('fill-color').value._parameters.stops.map((s) => {
      //   return [s[0], s[1]];
      // });
      fc = paint.get('fill-color').value._parameters.stops;
    } else {
      fc = [paint.get('fill-color').value.value.toString()];
    }

    if (
      paint.get('fill-outline-color').value._parameters &&
      paint.get('fill-outline-color').value._parameters.hasOwnProperty('stops')
    ) {
      // foc = paint.get('fill-outline-color').value._parameters.stops.map((s) => {
      //   return [s[0], s[1]];
      // });
      foc = paint.get('fill-outline-color').value._parameters.stops;
    } else {
      foc = [paint.get('fill-outline-color').value.value.toString()];
    }

    const Items = () => {
      let styles = [];
      if (fc.length > 2) {
        styles = fc.map(l => {
          return [...l, foc[0]];
        });
      } else if (foc.length > 2) {
        styles = foc.map(l => {
          return [...l, fc[0]];
        });
      } else {
        styles = [[null, fc[0], foc[0]]];
      }

      const svgs = styles.map((s, i) => {
        return (
          <ListItem
            key={i}
            sx={{
              margin: 0,
              marginLeft: 4,
              padding: 0,
              display: 'flex'
            }}
          >
            <Box>
              <svg width="25" height="25">
                <rect
                  x="0"
                  y="0"
                  rx="0"
                  ry="0"
                  width="25"
                  height="25"
                  sx={{ fill: s[1], stroke: s[2], strokeWidth: 3 }}
                />
              </svg>
            </Box>
            <Box>
              <Text sx={{ padding: '3px' }}>{s[0]}</Text>
            </Box>
          </ListItem>
        );
      });

      return <Box>{svgs}</Box>;
    };

    return (
      <List
        sx={{
          margin: 0,
          padding: 0
        }}
      >
        <Items />
      </List>
    );
  }

  // circle-color, circle-opacity, circle-stroke-color, circle-stroke-opacity, circle-radius
  function circle(paint) {
    // circle-color, circle-stroke-color, circle-radius
    let cc; /* csc, */ let cr; let flexGrow; let textAlign;

    // Is circle-color a data driven paint style?
    cc = paint.get('circle-color').value.value.toString();
    // if(paint.get('circle-color').value._parameters && paint.get('circle-color').value._parameters.hasOwnProperty('stops')) {
    //   cc = paint.get('circle-color').value._parameters.stops;
    // } else {
    //   cc = [paint.get('circle-color').value.value.toString()];
    // }

    // Is circle-stroke-color a data driven paint style?
    // csc = paint.get('circle-stroke-color').value.value.toString()
    // if(paint.get('circle-stroke-color').value._parameters && paint.get('circle-stroke-color').value._parameters.hasOwnProperty('stops')) {
    //   csc = paint.get('circle-color').value._parameters.stops;
    // } else {
    //   csc = [paint.get('circle-stroke-color').value.value.toString()];
    // }

    // Is circle-radius a data driven paint style?
    if (
      paint.get('circle-radius').value._parameters &&
      paint.get('circle-radius').value._parameters.hasOwnProperty('stops') &&
      paint.get('circle-radius').value.kind === 'source'
    ) {
      flexGrow = 6;
      textAlign = 'center';
      cr = paint.get('circle-radius').value._parameters.stops;
    } else {
      flexGrow = 1;
      textAlign = 'left';
      cr = [paint.get('circle-radius').value.value.toString()];
      if(+cr[0] < 8) {
        cr = ["8"];
      }
    }

    const Items = () => {
      let styles = [];
      if (cr.length > 1) {
        styles = cr.map(l => {
          return [...l];
        });
      } else {
        styles = [[null, cr[0]]];
      }

      const svgs = styles.map((s, i) => {
        const cr = +s[1] + +s[1] * 0.75;
        return (
          <ListItem
            key={i}
            sx={{
              margin: 0,
              marginLeft: 4,
              padding: 0,
              display: 'flex'
            }}
          >
            <Box sx={{ flexGrow, textAlign }}>
              <svg width={cr} height={cr}>
                <circle
                  cx={cr / 2.0}
                  cy={cr / 2.0}
                  r={cr / 2.0 - 0.5}
                  sx={{
                    fill: cc
                  }}
                />
              </svg>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                lineHeight: s[1] >= 10 ? `${+s[1] * 1.8388 - 7.5}px` : '15px'
              }}
            >
              <Text sx={{ padding: '3px' }}>{s[0]}</Text>
            </Box>
          </ListItem>
        );
      });

      return <Box>{svgs}</Box>;
    };

    return (
      <List
        sx={{
          margin: 0,
          padding: 0
        }}
      >
        <Items />
      </List>
    );
  }

  // line-cap, line-join, line-opacity, line-color, line-width, line-dasharray, line-gradient
  function line(paint) {
    let lc;
    const {kind} = paint.get('line-color').value;
    if (kind === 'source' || kind === 'constant') {
      // is it a data-driven style?
      if (
        paint.get('line-color').value._parameters &&
        paint.get('line-color').value._parameters.hasOwnProperty('stops')
      ) {
        lc = paint.get('line-color').value._parameters.stops;
      } else {
        lc = [paint.get('line-color').value.value.toString()];
      }

      const Items = () => {
        let styles = [];
        if (lc.length > 1) {
          styles = lc.map(l => {
            return [...l];
          });
        } else {
          styles = [[null, lc[0]]];
        }

        const svgs = styles.map((s, i) => {
          return (
            <ListItem
              key={i}
              sx={{
                margin: 0,
                marginLeft: 4,
                padding: 0,
                display: 'flex',
                alignItems: 'bottom'
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <svg width="25" height="25">
                  <rect
                    x="0"
                    y="0"
                    rx="0"
                    ry="0"
                    width="25"
                    height="7.5"
                    sx={{ fill: s, strokeWidth: 2 }}
                  />
                </svg>
              </Box>
              <Box>
                <Text /* sx={{ padding: '3px' }} */>{s[0]}</Text>
              </Box>
            </ListItem>
          );
        });

        return <Box>{svgs}</Box>;
      };

      return (
        <List
          sx={{
            margin: 0,
            padding: 0
          }}
        >
          <Items />
        </List>
      );
    } if (paint.get('line-color').value.kind === 'composite') {
      try {
        lc = paint
          .get('line-color')
          .value._styleExpression.expression.outputs[0].outputs[0].value.toString();
        return (
          <List
            sx={{
              margin: 0,
              marginLeft: 4,
              padding: 0
            }}
          >
            <ListItem sx={{ margin: 0, marginLeft: 4, padding: 0 }}>
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
      // todo: determine color from other line types
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
