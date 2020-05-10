export default async function calculateMeasurements(feature, units) {
  // lazy load these deps

  const { default: area } = await import('@turf/area');
  const { default: length } = await import('@turf/length');

  const drawnLength = length(feature) * 1000; // meters
  const drawnArea = area(feature); // square meters

  let measurement;

  if (drawnLength > drawnArea) {
    switch (units) {
      case 'm':
        measurement = drawnLength;
        break;
      case 'ft':
        measurement = drawnLength * 3.28084;
        break;
      case 'km':
        measurement = drawnLength / 1000;
        break;
      case 'mi':
        measurement = drawnLength * 0.000621371;
        break;
      default:
        measurement = drawnLength;
        break;
    }
  } else {
    switch (units) {
      case 'm²':
        measurement = drawnArea;
        break;
      case 'ft²':
        measurement = drawnArea * 10.7639;
        break;
      case 'km²':
        measurement = drawnArea / 1000000;
        break;
      case 'mi²':
        measurement = drawnArea / 2589988.1103;
        break;
      case 'ac':
        measurement = drawnArea * 0.000247105;
        break;
      default:
        measurement = drawnArea;
        break;
    }
  }

  return measurement;
}
