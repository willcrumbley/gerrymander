"use strict"

import React from 'react';
import URI from 'urijs';
import $ from 'jquery';

import efficiency_gap_ge_8 from '../efficiency_gap_ge_8.js';


class JavascriptSandbox extends React.Component {
  /**
   * @props [String] fnString - Function string to initialize with
   * @props [Object] states - Array of states data
   * @props [Function] onCalculate - Callback to be executed with the result of calculating the metric
   * @props [Boolean] runOnMount - If true, will calculate the function upon rendering
   */
  constructor(props) {
    super(props);
    this.state = {
      fnString: this.props.fnString
    };

    window.addEventListener('message', (e) => {
      if(e.origin == 'null' && e.data.name == 'metric-results') {
        this.props.onCalculate(e.data.states);
      }
    })

    this.calculateMetric = this.calculateMetric.bind(this);
    this.setFnString = this.setFnString.bind(this);
    this.onIframeLoaded = this.onIframeLoaded.bind(this);
    this.clickCalculate = this.clickCalculate.bind(this);
  }

  render() {
    return (
      <div>
        <div className='col col-12'>
            <div className='code'>{'function(options) {'}</div>
            <textarea value={this.state.fnString} rows={30} cols={120}
              className="metric-function" onChange={this.setFnString}/>
            <br />
            <div className='code'>}</div>
        </div>
        <div className="alert alert-warning row m-4">
          <p>
            Warning! Clicking this button will execute the JavaScript in the black text area above.
            If you have any uncertainty about what this code will do, please do not execute it!
          </p>
          <button id='calculate-metric' type="button" className="btn btn-primary" onClick={this.clickCalculate}>
            Calculate the Metric
          </button>
        </div>
        <iframe id='js-sandbox' sandbox='allow-scripts' src='./js-sandbox.html' onLoad={this.onIframeLoaded} ref={(input) => {this.iframe = input;}}/>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.fnString != undefined) {
      this.setState({fnString: nextProps.fnString});
    }
  }

  onIframeLoaded() {
    if(this.props.runOnMount) {
      this.calculateMetric();
    }
  }

  clickCalculate() {
    this.calculateMetric();
    // Scroll to the map
    $('html, body').animate({
      scrollTop: $("#map-row").offset().top
    }, 1000);
  }

  calculateMetric() {
    let data = {
      algorithm: this.state.fnString,
      states: this.props.states,
      name: 'calculate-metric'
    };
    this.iframe.contentWindow.postMessage(data, '*');
  }

  setFnString(e) {
    this.setState({fnString: e.target.value});
  }
}


/**
 * Wrapper around JavascriptSandbox that fetches functions from Github
 */
class MetricFunctionSandbox extends React.Component {
  /**
   * @props [Object] states - Array of states data
   * @props [Function] onCalculate - Callback to be executed with the result of calculating the metric
   */
  constructor(props) {
    super(props);
    this.state = {
      fnString: '',
      runOnMount: false 
    };
  }

  render() {
    return (
      <JavascriptSandbox
        states={this.props.states}
        fnString={this.state.fnString}
        onCalculate={this.props.onCalculate}
        runOnMount={this.state.runOnMount}
      />
    );
  }

  componentWillMount() {
    this.fetch_metric_function()
      .then((fnString) => {
        this.setState({fnString: fnString});
      })
  }


  fetch_metric_function() {
    let uri = new URI(window.location.href);
    let gist = uri.query(true).gist;

    if(gist) {
      let gist_url = `https://gist.githubusercontent.com/${gist}/raw`;

      return fetch(gist_url, {mode: 'cors'})
        .then((response) => {
          if(response.ok) {
            return response.text();
          } else {
            throw Error(response);
          }
        })
    } else {
      return new Promise((resolve) => {
        this.setState({runOnMount: true})
        resolve(efficiency_gap_ge_8);
      })
    }
  }
}

module.exports = MetricFunctionSandbox;
