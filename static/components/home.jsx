import React from 'react';
import $ from 'jquery';

import render_map from '../utils/render_map.js';
import ShareableLinkGenerator from './link_generator.jsx';
import MetricFunctionSandbox from './sandbox.jsx';
import StateTable from './state_table.jsx';


class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      houseData: null
    }

    this.updateWithMetricData = this.updateWithMetricData.bind(this);
  }

  renderMetricViz(states) {
    var window_width = $(window).width();
    var map_size = 900;
    var show_legend = true;
    if (window_width < 900) {
      map_size = window_width * 0.9;
      show_legend = false;
    }
    render_map(states, '#map', map_size, show_legend);
  }

  /**
   * Take the state data from the metric calculation and sort/filter it.
   */
  processMetricData(states) {
    states.sort(function(a, b) {
      return parseFloat(Math.abs(b.metric)) - parseFloat(Math.abs(a.metric));
    });

    return states.filter(function(state) {
      return state.include;
    });
  }

  updateWithMetricData(states) {
    let filteredStates = this.processMetricData(states);
    this.renderMetricViz(filteredStates);
    this.refMapDisclaimer.innerText = 'Excluded states shown in grey.';
  }

  renderStatesTable() {
    if(this.state.houseData != null) {
      return <StateTable states={this.state.houseData.states} />;
    }
  }

  renderSandbox() {
    if(this.state.houseData != null) {
      return (
        <MetricFunctionSandbox
          states={this.state.houseData.states}
          onCalculate={this.updateWithMetricData}
        />
      )
    }
  }

  render() {
    return (
      <div className="row mt-3">
        <div className="content col col-12 px-3">
          <div id="blurb" className="col col-12">
            <div className='alert alert-warning hidden-md-up'>Note: most of this site's functionality is disabled on mobile screen sizes. Feel free to explore then return with a larger device.</div>
            <p>This site exists to allow interested users to explore the <a href="/">algorithm underlying the efficiency gap</a>, and then to create and share their own variant.</p>
            <p>To report problems, or to propose that we add new data to the input dataset, please log an issue (or even better, make a pull request) at the project's <a href="https://github.com/willcrumbley/gerrymander/issues">Github repo</a>.</p>
          </div>
          <div id="map-row" className="col col-12 py-sm-4">
            <h2>US States By Calculated Metric (as of 2016)</h2>
            <p>States in red are most gerrymandered to favor Republicans, states in blue are gerrymandered to favor Democrats.</p>
            <div id="map"></div>
            <div ref={(input) => this.refMapDisclaimer = input} id='map-disclaimer' className='alert alert-info'>For security reasons, the map will not display the metric until you review the algorithm and click the 'Calculate' button below.</div>
          </div>
          <div id="code" className="col col-12 hidden-sm-down py-sm-4">
            <h2>Algorithm to Calculate Gerrymandering Metric</h2>
            <div className='row'>
              <div id="metric-sandbox">
                {this.renderSandbox()}
              </div>
              <div className="col col-12">
                <div>
                  The preceding JavaScript function should calculate a metric of partisan gerrymandering and return
                  an object containing: 
                  <table className='table table-striped table-bordered'>
                    <thead>
                      <tr>
                        <th>Key</th>
                        <th>Type</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>metric</td>
                        <td><code>Float</code></td>
                        <td>The metric of partisan gerrymandering.</td>
                      </tr>
                      <tr>
                        <td>include</td>
                        <td><code>Boolean</code></td>
                        <td>Whether the state should be evaluated</td>
                      </tr>
                      <tr>
                        <td>seats_flipped</td>
                        <td><code>Integer</code></td>
                        <td>
                          An estimate for the number of US House seats that were flipped to the other
                          party through gerrymandering
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div id="share" className="col col-12" >
                <h3>Share your own Algorithm</h3>
                <div className="col col-12">
                  <div className="row">
                    Create a&nbsp;<a target='_blank' href="https://gist.github.com/">Github gist</a>&nbsp;with just the body of
                    the function and enter its url below to generate a shareable link.
                    <a href="https://gist.github.com/pbhavsar/c228879badcf21eb42bad78ceb6f1e4b" target="_blank">Here's an example.</a>
                  </div>
                  <div id='link-generator' className="row mt-3">
                    <ShareableLinkGenerator />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id='state-table' className='col col-12 py-sm-4'>
            <div id='states-table'>
              {this.renderStatesTable()}
            </div>
          </div>
          <div id='state-data' className='col col-12 hidden-sm-down py-sm-4'> 
            <h2>Explore the State Data Used as Input</h2>
            <div className='code'>
              <textarea
                name="state-data-area"
                value={(this.state.houseData) ? JSON.stringify(this.state.houseData.states, undefined, 4) : ''}
                id="state-data-area"
                rows={20}
                cols={100}
                readOnly
                className="code">
              </textarea>
            </div>
          </div>
          <div id='notes' className='col col-12 py-sm-4'>
            <div className='hidden-sm-down'>
              <h2>Is this safe?</h2>
              <p>This site allows the user to run arbitrary JavaScript from the textarea
              above. If you believe that this site introduces any unaddressed security vulnerabilities, please file an issue at <a href='https://github.com/willcrumbley/gerrymander'>https://github.com/willcrumbley/gerrymander</a> and we will address the issue.</p>
            </div>
            <div className='hidden-sm-down'>
              <h2>What about XSS and other kinds of malicious JavaScript?</h2>
              <p>We are aware of the potential danger of sharing links with malicious 
              JavaScript encoded, so (except for the default algorithm) the site does not automatically execute the decoded JavaScript, instead asking users to inspect the decoded script and execute it themselves. JavaScript
              is also executed in a sandboxed iframe, and this page has a strict Content Security Policy.</p>
            </div>
            <div>
              <h2>Data source</h2>
              <p>"115th Congress Members Guide with Elections and Demographic Data by District" <a href="https://docs.google.com/spreadsheets/d/1oRl7vxEJUUDWJCyrjo62cELJD2ONIVl-D9TSUKiK9jk/edit">(Available On Google Docs)</a></p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  async componentWillMount() {
    let response = await fetch('/data/house_by_state.json');
    if(response.ok) {
      let data = await response.json();
      this.setState({
        houseData: data
      });
    }
  }
}

module.exports = HomePage
