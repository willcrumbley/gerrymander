"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import base64 from 'base-64';
import $ from 'jquery';
import wait_until from 'wait-until';

import efficiency_gap_ge_8 from './efficiency_gap_ge_8.js';
import Navigation from './components/navigation.jsx';
import StateTable from './components/state_table.jsx';
import StateMap from './components/state_map.jsx';
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
    });
}

gerry_app.display_state_metrics = function(states) {
    ReactDOM.render(<StateTable states={states} />, document.getElementById('states-table'));
    ReactDOM.render(<StateMap states={states} width={900}/>, document.getElementById('map'));
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
    });
});
