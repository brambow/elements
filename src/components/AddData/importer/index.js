// @description Load various file format
// returns GeoJSON
import csv2geojson from 'csv2geojson'; //csv
import togeojson from '@mapbox/togeojson'; //kml, gpx
import shpjs from 'shpjs'; //zipped shapefile

const config = {
  maxFileSize: 10e7 //in bytes, 100 mb
};

class Importer {
  constructor() {
    this.reader = new FileReader();
    this.reader.onload = this._handleFile.bind(this);
  }

  load(file, cb) {
    if (!file) throw 'File Required';
    if (!cb) throw 'Callback Required';
    this.cb = cb;
    this.file = file;
    this.fileExt = this._getExtension();
    this.fileDetails = {
      fileSize: this.file.size,
      fileName: this.file.name,
      fileExt: this.fileExt
    };
    if (this.file.size >= config.maxFileSize) {
      cb({
        error: 'File must be less than 20mb',
        fileDetails: this.fileDetails
      });
    } else {
      if (this.fileExt.toLowerCase() == 'zip') {
        this.reader.readAsArrayBuffer(this.file);
      } else {
        this.reader.readAsText(this.file, 'UTF-8');
      }
    }
  }

  _getExtension() {
    var fArr = this.file.name.split('.');
    return fArr[fArr.length - 1];
  }

  _handleFile(evt) {
    switch (this.fileExt.toLowerCase()) {
      case 'csv':
        this._handleCSV(evt);
        break;
      case 'kml':
        this._handleKML(evt);
        break;
      case 'geojson':
      case 'topojson':
      case 'json':
        this._handleJSON(evt);
        break;
      case 'gpx':
        this._handleGPX(evt);
        break;
      case 'igc':
        this._handleIGC(evt);
        break;
      case 'zip':
        this._handleSHP(evt);
        break;
      default:
        this._notRecognized();
        break;
    }
  }

  _handleJSON(evt) {
    try {
      let res = JSON.parse(evt.target.result);
      if (res.type && res.type.toLowerCase() == 'topology') {
        this._handleTopoJSON(evt);
      } else {
        this._handleGeoJSON(evt);
      }
    } catch (err) {
      this.cb({
        error: `Problem parsing JSON (${err.toString()})`,
        fileDetails: this.fileDetails
      });
    }
  }

  _handleCSV(evt) {
    let latitudes = ['y', 'lat', 'latitude'];
    let longitudes = ['x', 'lng', 'lon', 'long', 'longitude'];
    var latitude = undefined;
    var longitude = undefined;
    let csv = evt.target.result;
    let header = csv.split('\n')[0].split(',');
    header.forEach(column => {
      if (latitudes.indexOf(column.toLowerCase().trim()) !== -1) {
        latitude = column.trim();
      }
      if (longitudes.indexOf(column.toLowerCase().trim()) !== -1) {
        longitude = column.trim();
      }
    });
    if (!longitude || !latitude) {
      throw 'no latitude (y, lat, latitude) or longitude (x, lng, long, longitude) field found';
    }
    csv2geojson.csv2geojson(
      csv,
      {
        latfield: latitude,
        lonfield: longitude
      },
      (err, data) => {
        if (err) throw err;
        this.cb(this.fileDetails, data);
      }
    );
  }

  _handleKML(evt) {
    let xml = new window.DOMParser().parseFromString(
      evt.target.result,
      'application/xml'
    );
    let geojson = togeojson.kml(xml, { style: true });
    this.cb(this.fileDetails, geojson);
  }

  _handleGeoJSON(evt) {
    this.cb(this.fileDetails, JSON.parse(evt.target.result));
  }

  _handleTopoJSON(evt) {
    console.log('handle as topojson');
  }

  _handleGPX(evt) {
    let xml = new window.DOMParser().parseFromString(
      evt.target.result,
      'application/xml'
    );
    let geojson = togeojson.gpx(xml);
    this.cb(this.fileDetails, geojson);
  }

  _handleIGC(evt) {
    console.log('handle as igc');
  }

  _handleSHP(evt) {
    let geojson = shpjs.parseZip(evt.target.result);
    this.cb(this.fileDetails, geojson);
  }

  _notRecognized() {
    console.log('sorry, i didnt recognize this format');
    this.cb({
      error: 'File format ' + this.fileExt + ' not recognized.',
      fileDetails: this.fileDetails
    });
  }
}

export default Importer;
