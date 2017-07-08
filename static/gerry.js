window.gerry_app = {};

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

gerry_app.default_metric = `// This is the efficiency gap metric, as defined in 
// Stephanopoulos and McGhee, "Partisan Gerrymandering and the Efficiency Gap", 2014.
// See: http://chicagounbound.uchicago.edu/cgi/viewcontent.cgi?article=1946&context=public_law_and_legal_theory
var state = options.state;
var total_state_votes = 0;
var dem_wasted_votes = 0;
var rep_wasted_votes = 0;
for (let district of state.house_districts) {
    var total_votes = district.dem_votes + district.rep_votes;
    total_state_votes += total_votes;
    if (district.dem_votes > district.rep_votes) {
        dem_wasted_votes += (district.dem_votes - total_votes / 2);
        rep_wasted_votes += district.rep_votes;
    }
    else {
        rep_wasted_votes += (district.rep_votes - total_votes / 2);
        dem_wasted_votes += district.dem_votes;
    }
};
include = state.house_districts.length >= 8 ? true : false;
metric = (rep_wasted_votes - dem_wasted_votes) / total_state_votes;
return_obj = {
    metric: metric,
    include: include,
    seats_flipped: metric * state.house_districts.length
}
`

gerry_app.update_metric_url = function(metric_function) {
    var encoded_function_param = "?metric=" + base64.encode(metric_function);
    history.pushState({}, null, encoded_function_param);
}

gerry_app.calculate_state_metric = function(options) {
    var metric_function = $('#metric-function').val();
    eval(metric_function);
    return return_obj;
}

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

gerry_app.display_state_metrics = function(states) {
    $('#states-table tbody').children().remove();
    var pdf_link_prefix = "https://www2.census.gov/geo/maps/cong_dist/cd114/st_based/CD114_";
    var map_url_prefix = "https://nationalmap.gov/small_scale/printable/images/preview/congdist/pagecgd113_";
    for (let state of states) {
        var name = "<td>" + state.name + "</td>";
        var metric = "<td>" + state.metric + "</td>";
        var seats_flipped = "<td>" + state.seats_flipped + "</td>";
        var districts = "<td>" + state.house_districts.length + "</td>";
        var map_image = "<img class='state-map' src='" + map_url_prefix + state.code.toLowerCase() + ".gif'>";
        var map = "<td><a href = 'https://nationalmap.gov/small_scale/printable/congress.html' target='_blank'>" + 
            map_image + "</a></td>";
        var pdf = "<td><a href = '" + pdf_link_prefix + state.code + ".pdf' target='_blank'> (Census Bureau pdf) </a></td>";
        var state_row = "<tr id='" + state.fips + "''>"+ name + metric + seats_flipped + 
            districts + map + pdf + "</tr>";
        $('#states-table tbody').append(state_row);
    }
    var map = d3.geomap.choropleth()
        .geofile('./lib/topojson/countries/USA.json')
        .colors(colorbrewer.RdBu[9])
        .projection(d3.geoAlbersUsa)
        .column('metric')
        .unitId('fips')
        .scale(500)
        .legend(true)
        .width(500)
        .height(400)
        .domain([-0.25,0.25])
        .zoomFactor(1);
    $('#map').children().remove();
    map.draw(d3.select("#map").datum(states));
}

gerry_app.calculate_metrics = function() {
    var states = gerry_app.house_json["states"];
    for (let state of states) {
        var state_result = gerry_app.calculate_state_metric({"state": state});
        state.metric = state_result.metric.toFixed(2);
        state.include = state_result.include;
        state.seats_flipped = state_result.seats_flipped.toFixed(1);
    }
    gerry_app.sort_by_metric(states);
    var filtered_states = gerry_app.filter_states(states);
    gerry_app.display_state_metrics(filtered_states);
    var metric_function = $('#metric-function').val();
    gerry_app.update_metric_url(metric_function);    
}

gerry_app.set_metric_function = function() {
    var metric_param = getUrlParameter('metric');
    var metric_function = ""
    if (metric_param.length > 0) {
        metric_function = base64.decode(metric_param);
    }
    else {
        metric_function = gerry_app.default_metric
    }
    $('#metric-function').val(metric_function);    
}

$(function() {
    gerry_app.set_metric_function();
    $.getJSON("../data/house_by_state.json", function(house_json) {
        gerry_app.house_json = house_json;
        var calculate_button = $('#calculate-metric');
        calculate_button.click(gerry_app.calculate_metrics);
        calculate_button.click();
    });
});
