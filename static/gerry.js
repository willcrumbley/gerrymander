window.gerry_app = {};

gerry_app.default_metric = `// This is the efficiency gap metric, as defined in 
// Stephanopoulos and McGhee, "Partisan Gerrymandering and the Efficiency Gap", 2014.
// See: http://chicagounbound.uchicago.edu/cgi/viewcontent.cgi?article=1946&context=public_law_and_legal_theory
var state = options.state;
var total_state_votes = 0;
var dem_wasted_votes = 0;
var rep_wasted_votes = 0;
for (let district of state.house_districts) {
    for (let year of ["y2016", "y2014", "y2012"]) {
        for (let party of ["dem", "rep"]) {
            if (district.votes[year][party + "_votes_house"] === null) {
                if (year === "y2014") {
                    district.votes[year][party + "_votes_house"] = district.votes.y2012[party + "_votes_pres"]
                }
                else {
                    district.votes[year][party + "_votes_house"] = district.votes[year][party + "_votes_pres"]
                }
            }
        }
    }
    var dem_votes_avg = (district.votes.y2016.dem_votes_house + district.votes.y2014.dem_votes_house + 
                             district.votes.y2012.dem_votes_house)/3
    var rep_votes_avg = (district.votes.y2016.rep_votes_house + district.votes.y2014.rep_votes_house + 
                             district.votes.y2012.rep_votes_house)/3
    var total_votes = dem_votes_avg + rep_votes_avg;
    total_state_votes += total_votes;
    if (dem_votes_avg > rep_votes_avg) {
        dem_wasted_votes += (dem_votes_avg - total_votes / 2);
        rep_wasted_votes += rep_votes_avg;
    }
    else {
        rep_wasted_votes += (rep_votes_avg - total_votes / 2);
        dem_wasted_votes += dem_votes_avg;
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

gerry_app.display_state_metrics = function(states) {
    $('#states-table tbody').children().remove();
    var pdf_link_prefix = "https://www2.census.gov/geo/maps/cong_dist/cd114/st_based/CD114_";
    var map_url_prefix = "https://nationalmap.gov/small_scale/printable/images/preview/congdist/pagecgd113_";
    for (let state of states) {
        var name = "<td>" + state.name + "</td>";
        var metric = "<td>" + state.metric + "</td>";
        var seats_flipped = "<td>" + state.seats_flipped + "</td>";
        var districts = "<td>" + state.house_districts.length + "</td>";
        var num_dem_seats = state.house_districts
            .filter(district => district.votes.y2016.dem_votes_house > district.votes.y2016.rep_votes_house).length;
        var num_rep_seats = state.house_districts
            .filter(district => district.votes.y2016.rep_votes_house > district.votes.y2016.dem_votes_house).length;
        var dem_seats = "<td>" + num_dem_seats + "</td>";
        var rep_seats = "<td>" + num_rep_seats + "</td>";
        var map_image = "<img class='state-map' src='" + map_url_prefix + state.code.toLowerCase() + ".gif'>";
        var map = "<td><a href = 'https://nationalmap.gov/small_scale/printable/congress.html' target='_blank'>" + 
            map_image + "</a></td>";
        var pdf = "<td><a href = '" + pdf_link_prefix + state.code + ".pdf' target='_blank'> (Census Bureau pdf) </a></td>";
        var state_row = "<tr id='" + state.fips + "''>"+ name + metric + seats_flipped + 
            districts + dem_seats + rep_seats + map + pdf + "</tr>";
        $('#states-table tbody').append(state_row);
    }
    gerry_app.render_map(states);
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
    var metric_param = location.search.split('metric=')[1];
    var metric_function = ""
    if (metric_param !== undefined) {
        metric_function = base64.decode(metric_param);
    }
    else {
        metric_function = gerry_app.default_metric
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
        if (window.location.pathname === "/") {
            calculate_button.click();
        }
    });
    gerry_app.set_scroll();
});
