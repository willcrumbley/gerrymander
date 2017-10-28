"use strict";

module.exports = `/**
 * Calculating the efficiency gap from 2012-2016
 */
var state = options.state;
var state_total_votes = 0;
var d_wasted = 0;
var r_wasted = 0;

for (let district of state.house_districts) {
  for (let year of ["y2016", "y2014", "y2012"]) {
    for (let party of ["dem", "rep"]) {

      // For uncontested district elections, use vote data from the current or previous presidential election
      let is_uncontested = (district.votes[year][party + "_votes_house"] === null);

      if (is_uncontested) {
        // 2014 didn't have a presidential election, so we use 2012 data
        if (year === "y2014") {
          district.votes[year][party + "_votes_house"] = district.votes.y2012[party + "_votes_pres"];
        }
        else {
          district.votes[year][party + "_votes_house"] = district.votes[year][party + "_votes_pres"];
        }
      }
    }
  }

  // Average votes across the years for each party for this district
  var d_vote_avg = (district.votes.y2016.d_votes_house + district.votes.y2014.d_votes_house + 
    district.votes.y2012.d_votes_house)/3;
  var r_vote_avg = (district.votes.y2016.r_votes_house + district.votes.y2014.r_votes_house + 
    district.votes.y2012.r_votes_house)/3;

  // Calculate wasted votes for each party for this district
  var total_votes = d_vote_avg + r_vote_avg;
  state_total_votes += total_votes;

  if (d_vote_avg > r_vote_avg) {
    d_wasted += (d_vote_avg - total_votes / 2);
    r_wasted += r_vote_avg;
  }
  else {
    r_wasted += (r_vote_avg - total_votes / 2);
    d_wasted += d_vote_avg;
  }
}

// Calculate the efficiency gap for the entire state
var include = state.house_districts.length >= 8 ? true : false;
var efficiency_gap = (r_wasted - d_wasted) / state_total_votes;

return {
  metric: efficiency_gap,
  include: include,
  seats_flipped: efficiency_gap * state.house_districts.length
};
`
