"use strict";

module.exports = `// This is the efficiency gap metric, as defined in 
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
var include = state.house_districts.length >= 8 ? true : false;
var metric = (rep_wasted_votes - dem_wasted_votes) / total_state_votes;
var return_obj = {
    metric: metric,
    include: include,
    seats_flipped: metric * state.house_districts.length
}
`