"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import base64 from 'base-64';
import $ from 'jquery';
import wait_until from 'wait-until';

import house_data from '../data/house_by_state.json';
import default_metric from './default_metric.js';
import Navigation from './components/navigation.jsx';
import StateTable from './components/state_table.jsx';
import render_map from './utils/render_map.js';
import MetricFunctionSandbox from './components/sandbox.jsx';
import ShareableLinkGenerator from './components/link_generator.jsx';

window.gerry_app = {
    iframe_loaded: false
};

gerry_app.updateWithMetricData = function (states) {
  gerry_app.sort_by_metric(states);

  var filtered_states = gerry_app.filter_states(states);
  gerry_app.display_state_metrics(filtered_states);

  $('#map-disclaimer').text('Excluded states shown in grey.');
  // Scroll to the map
  $('html, body').animate({
    scrollTop: $("#map-row").offset().top
  }, 1000);
}

gerry_app.sort_by_metric = function(states) {
    states.sort(function(a, b) {
        return parseFloat(Math.abs(b.metric)) - parseFloat(Math.abs(a.metric));
    });
}

gerry_app.filter_states = function(states) {
    return states.filter(function(state) {
        return state.include;
    })
}

gerry_app.display_state_metrics = function(states) {
    ReactDOM.render(<StateTable states={states} />, document.getElementById('states-table'));
    render_map(states, '#map', 900);
}

gerry_app.display_input_data = function(state_data) {
    $("#state-data-area").val(JSON.stringify(state_data, undefined, 4));
}

gerry_app.initialize_sandbox = function() {
  let component = <MetricFunctionSandbox
                    states={gerry_app.house_json.states}
                    onCalculate={gerry_app.updateWithMetricData} />
  ReactDOM.render(component, document.getElementById('metric-sandbox'));
}

gerry_app.initialize_link_generator = function() {
  ReactDOM.render(<ShareableLinkGenerator />, document.getElementById('link-generator'));
}

$(function() {
    gerry_app.house_json = house_data;
    gerry_app.initialize_sandbox();
    gerry_app.initialize_link_generator();

    render_map(gerry_app.house_json.states, '#map', 900);
    gerry_app.display_input_data(gerry_app.house_json.states)
});

ReactDOM.render(<Navigation />, document.getElementById('navigation'));
