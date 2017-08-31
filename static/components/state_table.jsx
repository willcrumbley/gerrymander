"use strict"

import React from 'react';

var pdf_link_prefix = "https://www2.census.gov/geo/maps/cong_dist/cd114/st_based/CD114_";
var map_url_prefix = "https://nationalmap.gov/small_scale/printable/images/preview/congdist/pagecgd113_";
var pdf_url_prefix = "https://nationalmap.gov/small_scale/printable/images/pdf/congdist/pagecgd113_";
class TableRow extends React.Component {
    render() {
        var state = this.props.state;
        var num_dem_seats = state.house_districts
            .filter(district => district.votes.y2016.d_votes_house > district.votes.y2016.r_votes_house).length;
        var num_rep_seats = state.house_districts
            .filter(district => district.votes.y2016.r_votes_house > district.votes.y2016.d_votes_house).length;
        var map_url = map_url_prefix + state.code.toLowerCase() + ".gif";
        var map_pdf_url = pdf_url_prefix + state.code.toLowerCase() + ".pdf";
        var pdf_url = pdf_link_prefix + state.code + ".pdf";
        return (
            <tr id={state.fips}>
                <td>{state.name}</td>
                <td>{state.metric}</td>
                <td className='hidden-sm-down'>{state.seats_flipped}</td>
                <td className='hidden-sm-down'>{state.house_districts.length}</td>
                <td className='hidden-sm-down'>{num_dem_seats}</td>
                <td className='hidden-sm-down'>{num_rep_seats}</td>
                <td className='hidden-sm-down'>
                    <a href = {map_pdf_url} target='_blank'>
                        <img className='state-map' src={map_url} alt='Congressional district map for {state.name}'/>
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
          <div>
            <h2>US States, Ranked by Absolute Value of Calculated Metric (as of 2016)</h2>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>State</th>
                        <th>Metric</th>
                        <th className='hidden-sm-down'>US House Seats Flipped</th>
                        <th className='hidden-sm-down'>Total US House Districts</th>
                        <th className='hidden-sm-down'>Actual Dem House Seats, 2016</th>
                        <th className='hidden-sm-down'>Actual Rep House Seats, 2016</th>
                        <th className='hidden-sm-down'>Map</th>
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
