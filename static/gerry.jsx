"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import base64 from 'base-64';
import $ from 'jquery';
import wait_until from 'wait-until';

import default_metric from './default_metric.js';
import Navigation from './components/navigation.jsx';
import StateTable from './components/state_table.jsx';
import StateMap from './components/state_map.jsx';
import MetricFunctionSandbox from './components/sandbox.jsx';
import ShareableLinkGenerator from './components/link_generator.jsx';

window.gerry_app = {
    iframe_loaded: false
};

gerry_app.display_social_buttons = function(short_url) {
    var share_buttons = document.getElementById('share-buttons');
    while (share_buttons.firstChild) {
        share_buttons.removeChild(share_buttons.firstChild);
    }
    var tweet_text = 'A plausible algorithm to measure partisan gerrymandering?';
    window.twttr.widgets.createShareButton(short_url, share_buttons, { text: tweet_text });
    var fb = '<div class="fb-share-button" data-href="' + short_url + '" data-layout="button"></div>';
    $(share_buttons).append(fb);
    window.FB.XFBML.parse();    
}

gerry_app.update_short_url = function(short_url) {
    $('#share').removeAttr('hidden');
    $('#short-url').val(short_url);
    gerry_app.display_social_buttons(short_url);
}

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

gerry_app.calculate_metrics = function() {
    var frame = document.getElementById('js-sandbox');
    var data = {
        "states": gerry_app.house_json.states,
        "algorithm": $('#metric-function').val()
    }
    wait_until()
        .interval(500)
        .times(10)
        .condition(function() {
            return (gerry_app.iframe_loaded);
        })
        .done(function(result) {
            frame.contentWindow.postMessage(data, '*');
    });
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
        gerry_app.initialize_sandbox(house_data);
        gerry_app.initialize_link_generator();
        gerry_app.house_json = house_data;

        var calculate_button = $('#calculate-metric');
        calculate_button.click(gerry_app.calculate_metrics);
        gerry_app.display_input_data(house_data.states)
        if (window.location.search === "") {
            calculate_button.click();
        }

        ReactDOM.render(<Navigation states={house_data.states}/>, document.getElementById('navigation'));
    });
});
