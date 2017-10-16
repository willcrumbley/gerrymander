"use strict"

import React from 'react';
import {Link} from 'react-router-dom';


class Navigation extends React.Component {
    constructor() {
        super();
        this.state = {
            hideNav: true
        };

        this.showNavbar = this.showNavbar.bind(this);
    }

    showNavbar() {
        this.setState({hideNav: false});
    }

    render() {
        return (
            <div>
                <div id='navigation'>
                    <nav className="navbar fixed-top navbar-toggleable-md navbar-light bg-faded">
                      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                      </button>
                      <a className="navbar-brand" href="#">
                        <img src='./static/img/gerrymander-500.png' width="30" height="30" 
                            alt="Original 1812 Gerrymander cartoon"/>
                      </a>
                      <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="navbar-nav">
                          <Link className="nav-item nav-link" to="/">Home</Link>
                          <Link className="nav-item nav-link" to="/introduction">Introduction</Link>
                        </div>
                      </div>
                    </nav>
                </div>
            </div>
        )
    }
}

module.exports = Navigation;
