"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var base64 = require('base-64');
var $ = require('jquery');

var default_metric = require('./default_metric.js');
var shortener = require('./utils/shortener.js');

window.gerry_app = {};

gerry_app.update_short_url = function(short_url) {
    $('#share').removeAttr('hidden');
    $('#short_url').html("<a href='" + short_url + "'>" + short_url + "</a>");
}

gerry_app.update_metric_url = function(metric_function) {
    var encoded_function_param = "?metric=" + base64.encode(metric_function);
    history.pushState({}, null, encoded_function_param);
    shortener.shorten(window.location.href, gerry_app.update_short_url);
}

window.addEventListener('message',
    function (e) {
      var frame = document.getElementById('js-sandbox');
      if (e.origin === "null" && e.source === frame.contentWindow) {
        var states = e.data;
        gerry_app.sort_by_metric(states);
        var filtered_states = gerry_app.filter_states(states);
        gerry_app.display_state_metrics(filtered_states);
        var metric_function = $('#metric-function').val();
        gerry_app.update_metric_url(metric_function);    
        $('#map-disclaimer').text('Excluded states shown in grey.')
        }
    });

gerry_app.sort_by_metric = function(states) {
    states.sort(function(a, b) {
        return parseFloat(Math.abs(b.metric)) - parseFloat(Math.abs(a.metric));
    });
}

gerry_app.filter_states = function(states) {
    return states.filter(function(state) {
        return state.include;
    })    
}

gerry_app.render_map = function(states) {
    var map = d3.geomap.choropleth()
        .geofile('./lib/topojson/countries/USA.json')
        .colors(colorbrewer.RdBu[9])
        .projection(d3.geoAlbersUsa)
        .column('metric')
        .unitId('fips')
        .scale(900)
        .legend(true)
        .width(900)
        .domain([-0.25,0.25])
        .zoomFactor(1);
    $('#map').children().remove();
    map.draw(d3.select("#map").datum(states));
}

var pdf_link_prefix = "https://www2.census.gov/geo/maps/cong_dist/cd114/st_based/CD114_";
var map_url_prefix = "https://nationalmap.gov/small_scale/printable/images/preview/congdist/pagecgd113_";
class TableRow extends React.Component {
    render() {
        var state = this.props.state;
        var num_dem_seats = state.house_districts
            .filter(district => district.votes.y2016.dem_votes_house > district.votes.y2016.rep_votes_house).length;
        var num_rep_seats = state.house_districts
            .filter(district => district.votes.y2016.rep_votes_house > district.votes.y2016.dem_votes_house).length;
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
        );
    }
}

gerry_app.display_state_metrics = function(states) {
    ReactDOM.render(<StateTable states={states} />, document.getElementById('states-table'));
    gerry_app.render_map(states);
}

gerry_app.calculate_metrics = function() {
    var frame = document.getElementById('js-sandbox');
    var data = {
        "states": gerry_app.house_json["states"],
        "algorithm": $('#metric-function').val()
    }
    frame.contentWindow.postMessage(data, '*');
}

gerry_app.set_metric_function = function() {
    var metric_param = location.search.split('metric=')[1];
    var metric_function = ""
    if (metric_param !== undefined) {
        metric_function = base64.decode(metric_param);
    }
    else {
        metric_function = default_metric
    }
    $('#metric-function').val(metric_function);    
}

gerry_app.display_input_data = function(state_data) {
    $("#state-data-area").val(JSON.stringify(state_data, undefined, 4));
}

gerry_app.set_scroll = function() {
    // From: http://callmenick.com/post/single-page-site-with-smooth-scrolling-highlighted-link-and-fixed-navigation
    /** 
     * This part does the "fixed navigation after scroll" functionality
     * We use the jQuery function scroll() to recalculate our variables as the 
     * page is scrolled/
     */
    $(window).scroll(function(){
        var window_top = $(window).scrollTop() + 12; // the "12" should equal the margin-top value for nav.stick
        var div_top = $('#nav-anchor').offset().top;
            if (window_top > div_top) {
                $('nav').addClass('stick');
            } else {
                $('nav').removeClass('stick');
            }
    });

    /**
     * This part causes smooth scrolling using scrollto.js
     * We target all a tags inside the nav, and apply the scrollto.js to it.
     */
    $("nav a").click(function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop: $(this.hash).offset().top}, 500);
    });

    /**
     * This part handles the highlighting functionality.
     * We use the scroll functionality again, some array creation and 
     * manipulation, class adding and class removing, and conditional testing
     */
    var aChildren = $("nav li").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {    
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function(){
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();

        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $(theID).height(); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").addClass("nav-active");
            } else {
                $("a[href='" + theID + "']").removeClass("nav-active");
            }
        }

        if(windowPos + windowHeight == docHeight) {
            if (!$("nav li:last-child a").hasClass("nav-active")) {
                var navActiveCurrent = $(".nav-active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                $("nav li:last-child a").addClass("nav-active");
            }
        }
    });
}

$(function() {
    gerry_app.set_metric_function();
    $.getJSON("../data/house_by_state.json", function(house_json) {
        gerry_app.house_json = house_json;
        var calculate_button = $('#calculate-metric');
        calculate_button.click(gerry_app.calculate_metrics);
        gerry_app.render_map(house_json["states"]);
        gerry_app.display_input_data(house_json.states)
        if (window.location.search === "") {
            calculate_button.click();
        }
    });
    gerry_app.set_scroll();
});