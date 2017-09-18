"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import base64 from 'base-64';
import $ from 'jquery';
import wait_until from 'wait-until';

import efficiency_gap_ge_8 from './efficiency_gap_ge_8.js';
import Navigation from './components/navigation.jsx';
import StateTable from './components/state_table.jsx';
import render_map from './utils/render_map.js';
import MetricFunctionSandbox from './components/sandbox.jsx';
import ShareableLinkGenerator from './components/link_generator.jsx';
import NarrativeCarousel from './components/narrative_carousel.jsx';

window.gerry_app = {
    iframe_loaded: false
};

// Required for Bootstrap
window.jQuery = $;

gerry_app.updateWithMetricData = function (states) {
  gerry_app.sort_by_metric(states);

  var filtered_states = gerry_app.filter_states(states);
  gerry_app.display_state_metrics(filtered_states);

  $('#map-disclaimer').text('Excluded states shown in grey.');
}

gerry_app.sort_by_metric = function(states) {
    states.sort(function(a, b) {
        return parseFloat(Math.abs(b.metric)) - parseFloat(Math.abs(a.metric));
    });
}

gerry_app.filter_states = function(states) {
    return states.filter(function(state) {
        return state.include;
    });
}

gerry_app.display_state_metrics = function(states) {
    ReactDOM.render(<StateTable states={states} />, document.getElementById('states-table'));
    var window_width = $(window).width();
    var map_size = 900;
    var show_legend = true;
    if (window_width < 900) {
      map_size = window_width * 0.9;
      show_legend = false;
    }
    render_map(states, '#map', map_size, show_legend);
}

gerry_app.display_input_data = function(state_data) {
    $("#state-data-area").val(JSON.stringify(state_data, undefined, 4));
}

gerry_app.initialize_sandbox = function(house_data) {
  let component = <MetricFunctionSandbox
                    states={house_data.states}
                    onCalculate={gerry_app.updateWithMetricData} />
  ReactDOM.render(component, document.getElementById('metric-sandbox'));
}

gerry_app.initialize_link_generator = function() {
  ReactDOM.render(<ShareableLinkGenerator />, document.getElementById('link-generator'));
}

$(function() {
    $.get('data/house_by_state.json').then(function(house_data) {
        gerry_app.house_json = house_data;
        gerry_app.initialize_sandbox(house_data);
        gerry_app.initialize_link_generator();

        gerry_app.display_input_data(gerry_app.house_json.states)
        ReactDOM.render(<Navigation states={house_data.states}/>, document.getElementById('navigation'));
        ReactDOM.render(<NarrativeCarousel />, document.getElementsByClassName('narrative-carousel')[0]);
    });
});
