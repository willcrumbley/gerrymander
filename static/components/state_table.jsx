"use strict"

import React from 'react';

var pdf_link_prefix = "https://www2.census.gov/geo/maps/cong_dist/cd114/st_based/CD114_";
var map_url_prefix = "https://nationalmap.gov/small_scale/printable/images/preview/congdist/pagecgd113_";
class TableRow extends React.Component {
    render() {
        var state = this.props.state;
        var num_dem_seats = state.house_districts
            .filter(district => district.votes.y2016.d_votes_house > district.votes.y2016.r_votes_house).length;
        var num_rep_seats = state.house_districts
            .filter(district => district.votes.y2016.r_votes_house > district.votes.y2016.d_votes_house).length;
        var map_url = map_url_prefix + state.code.toLowerCase() + ".gif";
        var pdf_url = pdf_link_prefix + state.code + ".pdf";
        return (
            <tr id={state.fips}>
                <td>{state.name}</td>
                <td>{state.metric}</td>
                <td>{state.seats_flipped}</td>
                <td>{state.house_districts.length}</td>
                <td>{num_dem_seats}</td>
                <td>{num_rep_seats}</td>
                <td>
                    <a href = 'https://nationalmap.gov/small_scale/printable/congress.html' target='_blank'>
                        <img className='state-map' src={map_url}/>
                    </a>
                </td>
                <td>
                    <a href={pdf_url} target='_blank'> (Census Bureau pdf) </a>
                </td>
            </tr>
        );
    }
}

class StateTable extends React.Component {
    render() {
        var states = this.props.states.map(function (state, index) {
          return (
            <TableRow key={index} state={state}/>
          );
        });
        return (
          <div className='row m-5'>
            <h2>US States, Ranked by Absolute Value of Calculated Metric</h2>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>State</th>
                        <th>Metric</th>
                        <th>US House Seats Flipped</th>
                        <th>Total US House Districts</th>
                        <th>Actual Dem House Seats, 2016</th>
                        <th>Actual Rep House Seats, 2016</th>
                        <th>Map</th>
                    </tr>
                </thead>
                <tbody>
                    {states}
                </tbody>
            </table>
          </div>
        );
    }
}

module.exports = StateTable;
