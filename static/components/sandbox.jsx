"use strict"

import React from 'react';
import $ from 'jquery';
import AceEditor from 'react-ace';
import 'brace/mode/javascript'
import 'brace/theme/monokai'

import {getCustomGistName, fetchGist} from '../utils/gist'
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
          <span className='code'>{'function(options) {'}</span>
          <AceEditor
            mode='javascript'
            theme='monokai'
            onChange={this.setFnString}
            width={'100%'}
            fontSize={14}
            showGutter={true}
            highlightActiveLine={true}
            value={this.state.fnString}
            editorProps={{
              $blockScrolling: Infinity
            }}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
            }} />
          <br />
          <div className='code'>}</div>
        </div>
        <div id='calculate-metric-warning' className="alert alert-warning">
          <p>
            Warning! Clicking this button will execute the JavaScript in the editor above.
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
    this.setState({fnString: e});
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


  /**
   * Fetch the metric function to display in the textbox from a github gist.
   * If no gist is provided, default to the efficiency gap and run the metric automatically (trusted)
   *
   * @returns [Promise] Promise that resolves to the code to display, or rejects if unable to fetch.
   */
  fetch_metric_function() {
    let gist = getCustomGistName(window.location.href);
    if(gist) {
      return fetchGist(gist);
    } else {
      this.setState({runOnMount: true});

      return new Promise((resolve) => {
        resolve(efficiency_gap_ge_8);
      })
    }
  }
}

module.exports = MetricFunctionSandbox;
