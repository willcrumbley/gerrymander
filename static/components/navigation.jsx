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
                <div id='nav' className='hidden-sm-down'>
                    <nav className="navbar fixed-top navbar-toggleable-md navbar-light bg-faded">
                      <a className="navbar-brand" href="#">
                        <img src='./static/img/gerrymander-500.png' width="30" height="30" 
                            alt="Original 1812 Gerrymander cartoon"/>
                      </a>
                      <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/introduction">Introduction</Link>
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
