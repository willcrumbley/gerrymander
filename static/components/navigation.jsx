"use strict"

import React from 'react';

import NarrativeModal from './narrative_modal.jsx';

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
                <div id='modal'>
                    <NarrativeModal show={true} states={this.props.states} onCloseModal={this.showNavbar}/>
                </div>
                <div id='nav' hidden={this.state.hideNav} className='hidden-sm-down'>
                    <nav className="navbar fixed-top navbar-toggleable-md navbar-light bg-faded">
                      <a className="navbar-brand" href="#">
                        <img src='./static/img/gerrymander-500.png' width="30" height="30" 
                            alt="Original 1812 Gerrymander cartoon"/>
                      </a>
                      <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#map-row">Map</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#code">Calculations</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#state-table">State Maps and Results</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#state-data">Source Data</a>
                            </li>
                        </ul>
                      </div>
                    </nav>
                </div>
            </div>
        )
    }
}

module.exports = Navigation;