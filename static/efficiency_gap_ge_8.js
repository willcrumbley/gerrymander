"use strict";

module.exports = `/**
 * Calculating the efficiency gap for the 2016 House of Representatives Election
 */

var state = options.state;
var state_total_votes = 0;
var d_wasted_votes = 0;
var r_wasted_votes = 0;

for (let district of state.house_districts) {
  let d_votes = district.votes.y2016.d_votes_house;
  let r_votes = district.votes.y2016.r_votes_house;
  let other_votes = district.votes.y2016.other_votes_house;

  var total_votes = d_votes + r_votes + other_votes;
  var minimum_to_win = total_votes / 2 + 1;

  // Calculate wasted votes
  if (d_votes > r_votes) {
    d_wasted_votes += d_votes - minimum_to_win;
    r_wasted_votes += r_votes;
  }
  else {
    d_wasted_votes += d_votes;
    r_wasted_votes += r_votes - minimum_to_win;
  }

  // Keep a running total of the total votes cast
  state_total_votes += total_votes;
}

// Calculate the efficiency gap
var metric = (r_wasted_votes - d_wasted_votes) / state_total_votes;

// Only include if there are at least 8 districts
var include = state.house_districts.length >= 8;

return {
 metric: metric,
 include: include,
 seats_flipped: metric * state.house_districts.length
}`
