"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import base64 from 'base-64'
import $ from 'jquery';
import wait_until from 'wait-until';

import efficiency_gap_ge_8 from './efficiency_gap_ge_8.js';
import HomePage from './components/home.jsx'
import Navigation from './components/navigation.jsx';
import NarrativeCarousel from './components/narrative_carousel.jsx';

// Required for Bootstrap
window.jQuery = $;

function App(props) {
  return (
    <div>
      <Navigation />
      <div className='container'>
        <Route path='/' component={HomePage} />
      </div>
    </div>
  )
}


$(function() {
    $.get('/data/house_by_state.json').then(function(house_data) {
        ReactDOM.render((
          <BrowserRouter>
            <App />
          </BrowserRouter>
        ), document.getElementById('container'))
    });
});
