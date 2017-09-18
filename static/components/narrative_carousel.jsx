"use strict"

import React from 'react';
import ReactModal from 'react-modal';
import $ from 'jquery';

import narrative_data from './narrative.jsx';

function NarrativeCarouselSlide({title, context, illustration, active}) {
  let activeClass = active ? "active" : "";

  return (
    <div className={`carousel-item ${activeClass}`}>
      <div className='col col-12'>
        <div className='row'>
          <div className='col col-12'>
            <h4>{title}</h4>
          </div>
        </div>
        <div className='row'>
          <div className='col col-12 col-md-6 px-md-4'>{context}</div>
          <div className='col-12 col-md-6'>
            {illustration}
          </div>
        </div>
      </div>
    </div>
  );
}

function NarrativeCarousel(props) {
  let slides = narrative_data.map((data, index) => {
    return NarrativeCarouselSlide(Object.assign({active: (index == 0)}, data));
  });

  return (
    <div className="carousel slide" data-ride="carousel">
      <div className="carousel-inner" role="listbox">
        {slides}
      </div>
      <a className="carousel-control-prev" href="#carouselIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

module.exports = NarrativeCarousel;
