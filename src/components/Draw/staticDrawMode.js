import allowMapInteractions from './allowMapInteractions';

let StaticMode = {};

StaticMode.onSetup = function() {
  this.setActionableState(); // default actionable state is false for all actions
  allowMapInteractions(this.map, false);
  return {};
};

StaticMode.toDisplayFeatures = function(state, geojson, display) {
  display(geojson);
};

export default StaticMode;
