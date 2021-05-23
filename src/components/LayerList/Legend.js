/** @jsxImportSource theme-ui */
/*  eslint-disable no-underscore-dangle */
import { Box, Text } from 'theme-ui';
import List from '../_primitives/List';
import ListItem from '../_primitives/ListItem';

const buildStyle = (lyr) => {
  const { type } = lyr;
  
  // fill-color, fill-opacity, fill-outline-color, fill-pattern
  function fill(paint) {
    let fc;
    let foc;
    const fcValue = paint.get('fill-color').value;
    const focValue = paint.get('fill-outline-color').value;
    const foValue = paint.get('fill-opacity').value?.value || 1;
    // Is this a data driven paint style?
    if (
      fcValue._parameters &&
      Object.prototype.hasOwnProperty.call(fcValue._parameters, 'stops')
      // fcValue._parameters.hasOwnProperty('stops')
    ) {
      // fc = fcValue._parameters.stops.map((s) => {
      //   return [s[0], s[1]];
      // });
      fc = fcValue._parameters.stops;
      if (fcValue._parameters.default) {
        fc = [...fc, ['', fcValue._parameters.default]]
      }
    } else if  (
      fcValue._styleExpression
    ) {
      const flattened = [];
      Object.keys(fcValue._styleExpression.expression.cases).forEach(k => {
        const value = fcValue._styleExpression.expression
          .outputs[+fcValue._styleExpression.expression.cases[k]].value.toString();
        const item = [k, value];
        flattened.push(item);
      });
      if(fcValue._styleExpression.expression.otherwise) {
        flattened.push(['', fcValue._styleExpression.expression.otherwise.value.toString()]);
      }
      fc = flattened;
    } else {
      fc = [fcValue.value.toString()];
    }

    if (
      focValue._parameters &&
      Object.prototype.hasOwnProperty.call(focValue._parameters, 'stops')
    ) {
      // foc = focValue._parameters.stops.map((s) => {
      //   return [s[0], s[1]];
      // });
      foc = focValue._parameters.stops;
      if (focValue._parameters.default) {
        foc = [...fc, ['', focValue._parameters.default]]
      }
    } else if  (
      focValue._styleExpression
    ) {
      const flattened = [];
      Object.keys(focValue._styleExpression.expression.cases).forEach(k => {
        const value = focValue._styleExpression.expression
          .outputs[+focValue._styleExpression.expression.cases[k]].value.toString();
        const item = [k, value];
        flattened.push(item);
      });
      if(focValue._styleExpression.expression.otherwise) {
        flattened.push(['', focValue._styleExpression.expression.otherwise.value.toString()]);
      }
      foc = flattened;
    } else {
      foc = [focValue.value.toString()];
    }

    const Items = () => {
      let styles = [];
      if (fc.length > 1) {
        styles = fc.map((l) => {
          return [...l, foc[0]];
        });
      } else if (foc.length > 1) {
        styles = foc.map((l) => {
          l.splice(1,0,fc[0]);
          return l;
        });
      } else {
        styles = [[null, fc[0], foc[0]]];
      }

      const svgs = styles.map((s, i) => {
        return (
          <ListItem
            // eslint-disable-next-line react/no-array-index-key
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
                  sx={{
                    fill: s[1],
                    stroke: s[2],
                    strokeWidth: 3,
                    fillOpacity: foValue,
                    strokeOpacity: foValue
                  }}
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
    /* csc, */ let cr;
    let flexGrow;
    let textAlign;

    // Is circle-color a data driven paint style?
    const cc = paint.get('circle-color').value.value.toString();
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
    const crValue = paint.get('circle-radius').value;
    // Is circle-radius a data driven paint style?
    if (
      crValue._parameters &&
      Object.prototype.hasOwnProperty.call(crValue._parameters, 'stops') &&
      crValue.kind === 'source'
    ) {
      flexGrow = 6;
      textAlign = 'center';
      cr = crValue._parameters.stops;
    } else {
      flexGrow = 1;
      textAlign = 'left';
      cr = [crValue.value.toString()];
      if (+cr[0] < 8) {
        cr = ['8'];
      }
    }

    const Items = () => {
      let styles = [];
      if (cr.length > 1) {
        styles = cr.map((l) => {
          return [...l];
        });
      } else {
        styles = [[null, cr[0]]];
      }

      const svgs = styles.map((s, i) => {
        const cSize = +s[1] + +s[1] * 0.75;
        return (
          <ListItem
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            sx={{
              margin: 0,
              marginLeft: 4,
              padding: 0,
              display: 'flex'
            }}
          >
            <Box sx={{ flexGrow, textAlign }}>
              <svg width={cSize} height={cSize}>
                <circle
                  cx={cSize / 2.0}
                  cy={cSize / 2.0}
                  r={cSize / 2.0 - 0.5}
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
    const lcValue = paint.get('line-color').value;
    const { kind } = lcValue;
    if (kind === 'source' || kind === 'constant') {
      // is it a data-driven style?
      if (
        lcValue._parameters &&
        Object.prototype.hasOwnProperty.call(lcValue._parameters, 'stops')
      ) {
        lc = lcValue._parameters.stops;
      } else {
        lc = [lcValue.value.toString()];
      }

      const Items = () => {
        let styles = [];
        if (lc.length > 1) {
          styles = lc.map((l) => {
            return [...l];
          });
        } else {
          styles = [[null, lc[0]]];
        }

        const svgs = styles.map((s, i) => {
          return (
            <ListItem
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              sx={{
                margin: 0,
                marginLeft: 4,
                padding: 0,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
              }}
            >
              <Box>
                <svg width="25" height="25">
                  <rect
                    x="0"
                    y="3.75"
                    rx="0"
                    ry="0"
                    width="25"
                    height="7.5"
                    sx={{ fill: s, strokeWidth: 2 }}
                  />
                </svg>
              </Box>
              <Box px={1}>
                <Text>{s[0]}</Text>
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
    if (paint.get('line-color').value.kind === 'composite') {
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
        console.error(err);
        return false;
      }
    } else {
      // todo: determine color from other line types
      return false;
    }
  }

  function symbol(/* val */) {
    console.log('legend cannot render symbol yet');
    return false;
  }

  function heatmap(/* val */) {
    console.log('legend cannot render heatmap yet');
    return false;
  }

  function fillExtrusion(/* val */) {
    console.log('legend cannot render fill-extrusion yet');
    return false;
  }

  function raster(/* val */) {
    console.log('legend cannot render raster yet');
    return false;
  }

  function hillshade(/* val */) {
    console.log('legend cannot render hillshade yet');
    return false;
  }

  function background(/* val */) {
    console.log('legend cannot render background yet');
    return false;
  }

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
};

// eslint-disable-next-line import/prefer-default-export
export { buildStyle };
/*  eslint-enable no-underscore-dangle */
