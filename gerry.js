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
var total_state_votes = 0;
var dem_wasted_votes = 0;
var rep_wasted_votes = 0;
for (let district of state["house_districts"]) {
    var total_votes = district["dem_votes"] + district["rep_votes"];
    total_state_votes += total_votes;
    if (district["dem_votes"] > district["rep_votes"]) {
        dem_wasted_votes += (district["dem_votes"] - total_votes / 2);
        rep_wasted_votes += district["rep_votes"];
    }
    else {
        rep_wasted_votes += (district["rep_votes"] - total_votes / 2);
        dem_wasted_votes += district["dem_votes"];
    }
};
return_val = (rep_wasted_votes - dem_wasted_votes) / total_state_votes;
`

gerry_app.update_metric_url = function(metric_function) {
    var encoded_function_param = "?metric=" + base64.encode(metric_function);
    history.pushState({}, null, encoded_function_param);
}

gerry_app.calculate_state_metric = function(state) {
    var metric_function = $('#metric-function').val();
    eval(metric_function);
    return return_val.toFixed(2);
}

gerry_app.sort_by_metric = function(states) {
    states.sort(function(a, b) {
        return parseFloat(b.metric) - parseFloat(a.metric);
    });
    gerry_app.display_state_metrics(states);
}

gerry_app.display_state_metrics = function(states) {
    $('#states-ranked').children().remove();
    for (let state of states) {
        var metric = "<span>" + state['name'] + ": " + state["metric"] + "</span>";
        var state_div = "<div id='" + state['code'] + "''>"+ metric + "</div>";
        $('#states-ranked').append(state_div);
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
        .domain([-0.5,0.5])
        .zoomFactor(1);
    $('#map').children().remove();
    map.draw(d3.select("#map").datum(states));
}

gerry_app.calculate_metrics = function() {
    var states = gerry_app.house_json["states"];
    for (let state of states) {
        state["metric"] = gerry_app.calculate_state_metric(state);
    }
    gerry_app.sort_by_metric(states);
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
    $.getJSON("./house_by_state.json", function(house_json) {
        gerry_app.house_json = house_json;
        var calculate_button = $('#calculate-metric');
        calculate_button.click(gerry_app.calculate_metrics);
        calculate_button.click();
    });
});
