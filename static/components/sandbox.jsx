const React = require('react')
const ReactDOM = require('react-dom')


/**
 * @props [String] fnString - Function string to initialize with
 * @props [Object] states - Array of states data
 * @props [Function] onCalculate - Callback to be executed with the result of calculating the metric
 */
class JavascriptSandbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fnString: this.props.fnString
    }

    window.addEventListener('message', (e) => {
      if(e.origin == 'null' && e.data.name == 'metric-results') {
        this.props.onCalculate(e.data.states)
      }
    })

    this.calculateMetric = this.calculateMetric.bind(this)
    this.setFnString = this.setFnString.bind(this)
  }

  render() {
    return (
      <div>
        <div>
            <span className='code'>{'function(options) {'}</span>
            <textarea value={this.state.fnString} rows={30} cols={120}
              className="metric-function" onChange={this.setFnString}/>
            <br />
            <span className='code'>}</span>
        </div>
        <div className="alert alert-warning row m-4">
          <p>
            Warning! Clicking this button will execute the JavaScript in the black text area above.
            If you have any uncertainty about what this code will do, please do not execute it!
          </p>
          <button id='calculate-metric' type="button" className="btn btn-primary" onClick={this.calculateMetric}>
            Calculate the Metric
          </button>
        </div>
        <iframe id='js-sandbox' sandbox='allow-scripts' src='./js-sandbox.html' ref={(input) => {this.iframe = input;}}/>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.fnString != undefined) {
      this.setState({fnString: nextProps.fnString})
    }
  }

  calculateMetric() {
    let data = {
      algorithm: this.state.fnString,
      states: this.props.states,
      name: 'calculate-metric'
    }
    this.iframe.contentWindow.postMessage(data, '*');
  }

  setFnString(e) {
    this.setState({fnString: e.target.value})
  }
}

module.exports = {JavascriptSandbox}
