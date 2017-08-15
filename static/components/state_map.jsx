// "use strict";

// import React from 'react';
// import ReactDOM from 'react-dom';
// var topojson = require('topojson');
// var MapChoropleth = require('react-d3-map-choropleth').MapChoropleth;
// var unemploy = require('dsv-loader?delimiter=\t!../../data/unemployment.tsv');

// import css from './css/c.css';
// import topodata from '../../data/us.json';

// class StateMap extends React.Component {
//   render() {
//     var width = 960,
//     height = 600;

//     // data should be a MultiLineString
//     var dataStates = topojson.mesh(topodata, topodata.objects.states, function(a, b) { return a !== b; });
//     /// data should be polygon
//     var dataCounties = topojson.feature(topodata, topodata.objects.counties).features;

//     // domain
//     var domain = {
//       scale: 'quantize',
//       domain: [0, .15],
//       range: d3.range(9).map(function(i) { return "q" + i + "-9"; })
//     };
//     var domainValue = function(d) { return parseInt(d.metric, 10); };
//     var domainKey = function(d) {return parseInt(d.id, 10) };
//     var mapKey = function(d) {return parseInt(d.id, 10) };

//     var scale = this.props.scale;
//     var translate = [width / 2, height / 2];
//     var projection = 'albersUsa';

//     return (
//       <MapChoropleth
//         width= {width}
//         height= {height}
//         dataPolygon= {dataCounties}
//         dataMesh= {dataStates}
//         scale= {scale}
//         domain= {domain}
//         domainData= {unemploy}
//         domainValue= {domainValue}
//         domainKey= {domainKey}
//         mapKey = {mapKey}
//         translate= {translate}
//         projection= {projection}
//         showGraticule= {false}
//       />
//     );
//   }
// }

// module.exports = StateMap;