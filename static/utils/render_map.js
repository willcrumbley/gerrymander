import $ from 'jquery';

var render_map = function(states, element_selector, width, show_legend) {
    var map = d3.geomap.choropleth()
        .geofile('./lib/topojson/countries/USA.json')
        .colors(colorbrewer.RdBu[9])
        .projection(d3.geoAlbersUsa)
        .column('metric')
        .unitId('fips')
        .scale(width)
        .legend(show_legend)
        .width(width)
        .domain([-0.25,0.25])
        .zoomFactor(1);
    $(element_selector).children().remove();
    map.draw(d3.select(element_selector).datum(states));
}

module.exports = render_map;