import React from 'react';
import URI from 'urijs';


class ShareableLinkGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shareableLink: null,
      error: false
    }

    this.calculateLink = this.calculateLink.bind(this)
  }

  render() {
    return (
      <div>
        <form className='form-inline'>
          <label className='mr-sm-2' for='gistUrlInput'>Gist URL:</label>
          <input
            type="text"
            className="form-control mr-sm-2" 
            id="gistUrlInput" 
            ref={(input) => {this.gistUrlInput = input}}
          />
          <button className="btn btn-primary" onClick={this.calculateLink}>Submit</button>
        </form>
        {this.renderError()}
        {this.renderLink()}
      </div>
    )
  }

  renderError() {
    if(this.state.error) {
      return (
        <div className="alert alert-danger"><strong>Oops!</strong> That doesn't look like a valid Github gist url.</div>
      )
    }
  }

  renderLink() {
    if(this.state.shareableLink) {
      return (
        <div>
          Link: <code>{this.state.shareableLink}</code>
        </div>
      )
    }
  }

  /**
   * Calculate the shareable link given the gist url the user entered.
   */
  calculateLink(e) {
    e.preventDefault();

    let gistPattern = /gist\.github\.com\/(.*\/.*)/
    let value = this.gistUrlInput.value || '';
    let match = value.match(gistPattern);

    if(match) {
      let uri = new URI(window.location.href);
      uri.query({gist: match[1]});
      this.setState({
        shareableLink: uri.toString(),
        error: false
      });
    } else {
      this.setState({
        shareableLink: null,
        error: true
      });
    }
  }
}


module.exports = ShareableLinkGenerator;
