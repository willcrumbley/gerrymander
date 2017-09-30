"use strict"

import React from 'react';
import ReactModal from 'react-modal';
import $ from 'jquery';

import narrative_data from './narrative.jsx';

function NarrativeCarouselSlide({title, context, illustration, active}) {
  let activeClass = active ? "active" : "";

  return (
    <div className={`carousel-item ${activeClass}`}>
      <div className="container">
        <div className='col col-12'>
          <div className='row'>
            <div className='col col-12'>
              <h4>{title}</h4>
            </div>
          </div>
          <div className='row'>
            <div className='col col-12 col-md-6'>{context}</div>
            <div className='col-12 col-md-6'>
              {illustration}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NarrativeCarouselIndicator({active, index}) {
  let activeClass = active ? "active" : "";
  return (<li data-target="#narrative-carousel" data-slide-to={`${index}`} className={`${activeClass}`}></li>);
}

function NarrativeCarousel(props) {
  let slides = narrative_data.map((data, index) => {
    return NarrativeCarouselSlide(Object.assign({active: (index == 0)}, data));
  });

  let indicators = narrative_data.map((data, index) => {
    return NarrativeCarouselIndicator(Object.assign({active: (index == 0), index: index}));
  });

  return (
    <div id='narrative-carousel' className="carousel slide" data-ride="carousel" data-interval="false">
      <div className="container">
        <div className="pt-5 mt-sm-5 ml-3">
          <h1>The efficiency gap, a proposed measure of unconstitutional partisan gerrymandering.</h1>
        </div>
      </div>
      <ol className="carousel-indicators">
        {indicators}
      </ol>
      <div className="carousel-inner mt-5" role="listbox">
        {slides}
      </div>
      <a className="carousel-control-prev" href="#narrative-carousel" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#narrative-carousel" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

module.exports = NarrativeCarousel;
