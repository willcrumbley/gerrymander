"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

class StateMap extends React.Component {
    drawMap() {
        var geofile = './lib/topojson/countries/USA.json'
        if (this.props.mapType === 'CD') {
            geofile = './lib/topojson/countries/cd113.json';
        }

        var map = d3.geomap.choropleth()
            .geofile(geofile)
            .colors(colorbrewer.RdBu[9])
            .projection(d3.geoAlbersUsa)
            .column('metric')
            .unitId('fips')
            .scale(this.props.width)
            .legend(true)
            .width(this.props.width)
            .domain([-0.25,0.25])
            .zoomFactor(1);
        map.draw(d3.select(this.refs.container).datum(this.props.states));
    }

    componentDidMount() {
        this.drawMap();
    }

    //this will remove the map from the dom when the react component is unmounted
    componentWillReceiveProps() {
        this.clear();
    }

    clear() {
        const container = this.refs.container;
        for (const child of Array.from(container.childNodes)) {
            container.removeChild(child);
        }
    }

    render() {
        return <div ref='container'></div>
    }
}

module.exports = StateMap;