import React from 'react';
import URI from 'urijs';

import shortener from '../utils/shortener.js';


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
          <label className='mr-sm-2' htmlFor='gistUrlInput'>Gist URL:</label>
          <input
            type="text"
            className="form-control mr-sm-2" 
            id="gistUrlInput" 
            ref={(input) => {this.gistUrlInput = input}}
          />
          <button className="btn btn-primary" onClick={this.calculateLink}>Generate</button>
        </form>
        {this.renderError()}
        {this.renderLink()}
      </div>
    )
  }

  componentDidMount() {
    this.initializeShareButtons();
  }

  componentDidUpdate() {
    this.initializeShareButtons();
  }

  renderError() {
    if(this.state.error) {
      return (
        <div className="alert alert-danger"><strong>Oops!</strong> That doesn't look like a valid Github gist url.</div>
      )
    }
  }

  renderLink() {
    if(this.shouldRenderShareInfo()) {
      return (
        <div>
          <div>
            Shareable URL: <code>{this.state.shareableLink}</code>
          </div>
          <div>
            Shortened URL: <code>{this.state.shortLink}</code>
          </div>
          <span className="fb-share-button" data-href={this.state.shortLink} data-layout="button"></span>
          <span id='twttr-share-button' ref={(input) => this.twttrButtonContainer = input}></span>
        </div>
      )
    }
  }

  initializeShareButtons() {
    if(this.shouldRenderShareInfo()) {
      let tweetText = 'Explore the efficiency gap, a measure of partisan gerrymandering.';
      window.twttr.widgets.createShareButton(this.state.shortLink, this.twttrButtonContainer, {text: tweetText});
      window.FB.XFBML.parse();
    }
  }

  shouldRenderShareInfo() {
    return this.state.shareableLink;
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

      shortener.shorten(uri.toString(), (shortUrl) => {
        this.setState({
          shareableLink: uri.toString(),
          shortLink: shortUrl,
          error: false
        });
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
