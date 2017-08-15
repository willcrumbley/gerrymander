"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import base64 from 'base-64';
import $ from 'jquery';
import wait_until from 'wait-until';

import default_metric from './default_metric.js';
import shortener from './utils/shortener.js';
import Navigation from './components/navigation.jsx';
import StateTable from './components/state_table.jsx';
import render_map from './utils/render_map.js';

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

gerry_app.update_metric_url = function(metric_function) {
    var encoded_function_param = "?metric=" + base64.encode(metric_function);
    history.pushState({}, null, encoded_function_param);
    shortener.shorten(window.location.href, gerry_app.update_short_url);
}

window.addEventListener('message',
    function (e) {
      var frame = document.getElementById('js-sandbox');
      if (e.origin === "null" && e.source === frame.contentWindow) {
            var states = e.data;
            gerry_app.sort_by_metric(states);
            var filtered_states = gerry_app.filter_states(states);
            gerry_app.display_state_metrics(filtered_states);
            var metric_function = $('#metric-function').val();
            gerry_app.update_metric_url(metric_function);    
            $('#map-disclaimer').text('Excluded states shown in grey.');
        }
    });

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

gerry_app.set_metric_function = function() {
    var metric_param = location.search.split('metric=')[1];
    var metric_function = ""
    if (metric_param !== undefined) {
        metric_function = base64.decode(metric_param);
    }
    else {
        metric_function = default_metric
    }
    $('#metric-function').val(metric_function);    
}

gerry_app.display_input_data = function(state_data) {
    $("#state-data-area").val(JSON.stringify(state_data, undefined, 4));
}

gerry_app.load_iframe = function() {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('sandbox', 'allow-scripts');
    iframe.id = 'js-sandbox';
    iframe.onload = function() { 
        gerry_app.iframe_loaded = true;
    };
    iframe.src = './js-sandbox.html'; 
    document.body.appendChild(iframe);
}

$(function() {
    $.get('data/house_by_state.json').then(function(house_data) {
        gerry_app.load_iframe();
        gerry_app.set_metric_function();
        gerry_app.house_json = house_data;
        var calculate_button = $('#calculate-metric');
        calculate_button.click(gerry_app.calculate_metrics);
        render_map(gerry_app.house_json.states, '#map', 900);
        gerry_app.display_input_data(gerry_app.house_json.states)
        if (window.location.search === "") {
            calculate_button.click();
        }
    });
});

ReactDOM.render(<Navigation />, document.getElementById('navigation'));