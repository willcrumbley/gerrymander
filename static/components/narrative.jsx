"use strict"

import React from 'react';

const WISCONSIN_RESULTS = require('../data/wisconsin_results')


/**
 * @param marginOfVictory [Float] - Percentage margin of victory, 0-100
 * @param winner [Boolean] - Whether to return the winner's vote percentage or the loser's
 */
function _getVotePercent(marginOfVictory, winner) {
  let margin = winner ? marginOfVictory : -marginOfVictory;
  return 50 + margin / 2;
}

const VOTES_RED = WISCONSIN_RESULTS.reduce((acc, val) => {
  let percent = _getVotePercent(val.marginOfVictory, val.winner == 'red');
  return acc + percent / 100 * val.totalVotes
} , 0);

const TOTAL_VOTES = WISCONSIN_RESULTS.reduce((acc, val) => {
  return acc + val.totalVotes
}, 0);
const PERCENTAGE_RED_VOTES = (VOTES_RED / TOTAL_VOTES * 100).toFixed(2);
const PERCENTAGE_RED_SEATS = (5.0 / 8.0 * 100).toFixed(2);


/**
 * Render a single blue-red district for visualization.
 *
 * @prop districtNum - Number of the district to render
 * @prop marginOfVictory - Percentage margin of victory (0-100)
 * @prop winner - Either 'red' or 'blue'
 */
function BRPercentageDistrict({districtNum, marginOfVictory, winner}) {
  let percentages = {
    red: _getVotePercent(marginOfVictory, (winner == 'red')),
    blue: _getVotePercent(marginOfVictory, (winner == 'blue'))
  };

  return (
    <div className='row mt-1'>
      <div className='col-1 text-center' style={{height: '30px'}}>{districtNum}</div>
      <div className='col-11' style={{height: '30px'}}>
        <div className='red d-inline-block' style={{width: `${percentages.red}%`}}>{percentages.red}%</div>
        <div className='blue d-inline-block' style={{width: `${percentages.blue}%`}}>{percentages.blue}%</div>
      </div>
    </div>
  );
};


/**
 * Render a single green-yellow district for visualization, displaying absolute votes.
 *
 * @prop districtNum - Number of the district to render
 * @prop numGreenVotes - The number of votes for the Green party
 * @prop numYellowVotes - The number of votes for the Yellow party
 */
function GYAbsoluteDistrict({districtNum, numGreenVotes, numYellowVotes}) {
  let gPercent = numGreenVotes / (numGreenVotes + numYellowVotes) * 100;
  return (
    <div className='row' style={{height: '30px'}}>
      <div className='col-1 text-center'> {districtNum} </div>
      <div className='col-11'>
        <div className='green d-inline-block' style={{width: `${gPercent}%`}}>{numGreenVotes}</div>
        <div className='yellow d-inline-block' style={{width: `${100 - gPercent}%`}}>{numYellowVotes || ''}</div>
      </div>
    </div>
  )
}


/**
 * Render a single green-yellow district for visualization, displaying absolute and wasted votes.
 *
 * @prop districtNum - Number of the district to render
 * @prop numGreenVotes - The number of votes for the Green party
 * @prop numYellowVotes - The number of votes for the Yellow party
 */
function GYAbsoluteDistrictWasted({districtNum, numGreenVotes, numYellowVotes}) {
  let winner = (numGreenVotes > numYellowVotes) ? 'green' : 'yellow';
  let minVotesToWin = (numGreenVotes + numYellowVotes) / 2.0 + 1;

  let green = (winner == 'green') ? minVotesToWin : 0;
  let yellow = (winner == 'yellow') ? minVotesToWin : 0;

  let greenWasted = (winner == 'green') ? numGreenVotes - minVotesToWin : numGreenVotes;
  let yellowWasted = (winner == 'yellow') ? numYellowVotes - minVotesToWin : numYellowVotes;

  // Get the style to use on each segment of the vote
  let getStyle = (votes) => {
    return {
      width: `${votes / (numGreenVotes + numYellowVotes) * 100}%`
    }
  }

  return (
    <div className='row' style={{height: '30px'}}>
      <div className='col-1 text-center'> {districtNum} </div>
      <div className='col-11'>
        <div className='green d-inline-block' style={getStyle(green)}>
          {green || ''}
        </div>
        <div className='green d-inline-block wasted' style={getStyle(greenWasted)}>
          {greenWasted || ''}
        </div>
        <div className='yellow d-inline-block wasted' style={getStyle(yellowWasted)}>
          {yellowWasted || ''}
        </div>
        <div className='yellow d-inline-block' style={getStyle(yellow)}>
          {yellow || ''}
        </div>
      </div>
    </div>
  )
}


function WisconsinDistricts() {
  return (<div>
      {WISCONSIN_RESULTS.map((obj, index) => {
        return <BRPercentageDistrict key={index} districtNum={index + 1} marginOfVictory={obj.marginOfVictory} winner={obj.winner} />
      })}
    </div>
  );
}


module.exports = [
    {
        title: <span></span>,
        context: <div>
                    <p>Gerrymandering is the practice of drawing electoral districts to give an advantage to 
                        a party or group, and has been a part of U.S. politics for at least two centuries.</p>
                    <p>The efficiency gap is a recently developed approach for quantifying the amount of gerrymandering
                        in a state.</p>
                </div>,
        illustration: <div>
                        <img src="./static/img/gerrymander.png" width="300"
                          alt="Original 1812 Gerrymander cartoon" className="mx-auto d-block img-fluid"/>
                        <div className="row">
                          <div className='col-12 text-center font-italic mt-2'>
                            Original 1812 Gerry-mander cartoon satirizing a district's shape
                          </div>
                        </div>
                      </div>
    },
    {
        title: <p>Constitutionality</p>,
        context: <div>
                    <p>In extreme cases, partisan gerrymandering can be used to <strong>decrease electoral competition</strong>,
                       or to grant one party <strong>a disproportionate number of seats</strong> in state legislatures</p>
                    <p>This has raised the question of whether there is an extent of gerrymandering that should
                       be considered unconstitutional under the Equal Protection clause of the constitution. However, there is no
                       agreed-upon standard on how to measure it.</p>
                    <p>There have been several attempts to propose legal tests for unconstitutional gerrymandering,
                       but the Supreme Court has rejected all of them to date.</p>
                 </div>,
        illustration:   <div>
                        <img src="./static/img/most-gerrymandered-districts.png" width="500"
                          alt="Most gerrymandered districts" className="mx-auto d-block img-fluid"/>
                        <div className="row">
                          <div className='col-10 offset-1 text-center font-italic mt-2'>
                            America's most gerrymandered districts (
                              <a href={'https://www.washingtonpost.com/news/wonk/wp/2014/05/15/americas-most-gerrymandered-congressional-districts'} target='_blank'>
                              Source
                              </a>
                            )
                          </div>
                        </div>
                      </div>
    },
    {
        title: <p>The Efficiency Gap</p>,
        context: <div>
                    <p>In 2014, Nicholas Stephanopoulos and Eric McGhee &nbsp;
                      <a href="https://poseidon01.ssrn.com/delivery.php?ID=177005005066088069091100071103013007009025023051035024067126120026003114011105087081043118057101052027117102030078116010113102021057038082085070005123074018074123007073048112122124116112031089025065116020110087030100066076106120018103082067121125106&EXT=pdf">
                        proposed the "efficiency gap"
                      </a>&nbsp;
                    as a quantifiable measure of a political party's 
                    advantage in the way a state's electoral districts are drawn.</p>
                    <p>This algorithm has become central to the U.S. Supreme Court's consideration of <i>Gill v. Whitford</i>,
                       the 2017-18 case challenging the 2011 Wisconsin redistricting plan.</p>
                    <p>If the court rules the plan unconstitutional, it would set a landmark precedent that will heavily
                       impact future elections.</p>
                </div>,
        illustration:   <div>
                          <div className="row">
                            <div className='col-12 intro-chart-title mb-2'>
                              2016 Wisconsin House Election Results by District
                            </div>
                          </div>
                          <WisconsinDistricts />
                          <div className="row">
                            <div className='col-12 text-center font-italic mt-2'>
                              Republicans won {PERCENTAGE_RED_VOTES}% of the votes, but {PERCENTAGE_RED_SEATS}% of the seats.
                              (<a href="https://ballotpedia.org/Redistricting_in_Wisconsin#State_legislative_maps" target='_blank'>data</a>)
                            </div>
                          </div>
                        </div>
    },
    {
        title: <p>Calculating the Efficiency Gap</p>,
        context: <div>
                    <p>Imagine a state containing 400 voters, which we want to split into 8 districts.
                        The districts can be gerrymandered in a number of ways that could easily advantage one party 
                        or another in elections.
                    </p>
                    <p>This is done by <strong>cracking</strong> a party's voters into districts where they lose
                        by small margins, and <strong>packing</strong> that party's voters into districts where
                        they win by large margins.
                    </p>
                    <p>This combination of <strong>cracking</strong> and <strong>packing</strong> allows a party to gain a disproportionate share of the
                        seats in a state and protect their seats from being challenged.
                    </p>
                </div>,
        illustration:   <div>
                          <div className="row">
                            <div className='col-12 intro-chart-title mb-2'>
                              Example Gerrymandered Election
                            </div>
                          </div>
                          <GYAbsoluteDistrict districtNum={1} numGreenVotes={50} numYellowVotes={0} />
                          <GYAbsoluteDistrict districtNum={2} numGreenVotes={40} numYellowVotes={10} />
                          <GYAbsoluteDistrict districtNum={3} numGreenVotes={35} numYellowVotes={15} />
                          <GYAbsoluteDistrict districtNum={4} numGreenVotes={20} numYellowVotes={30} />
                          <GYAbsoluteDistrict districtNum={5} numGreenVotes={20} numYellowVotes={30} />
                          <GYAbsoluteDistrict districtNum={6} numGreenVotes={20} numYellowVotes={30} />
                          <GYAbsoluteDistrict districtNum={7} numGreenVotes={20} numYellowVotes={30} />
                          <GYAbsoluteDistrict districtNum={8} numGreenVotes={15} numYellowVotes={35} />
                          <div className="row">
                            <div className='col-12 text-center font-italic mt-2'>
                              Yellow won 45% of the votes, but 62.5% of the seats.
                            </div>
                          </div>
                        </div>
    },
    {
        title: null,
        context: <div>
                    <div>The efficiency gap attempts to measure all of that cracking and packing and reduce it to a single number.
                        It does this by calculating the number of <strong>'wasted votes'</strong> across
                        a state. Wasted votes in a district are either:
                        <ul>
                            <li className='mt-1'>Votes for the winning party in excess of the 50% + 1 <br /> needed to win.</li>
                            <li className='mt-1'>Votes for the losing party</li>
                        </ul>
                    </div>
                    <p>These votes are considered 'wasted' because they could have been more effectively used in other districts.</p>
                </div>,
        illustration: <div>
                        <div className="row">
                          <div className='col-12 intro-chart-title mb-2'>
                            Wasted Votes in a District
                          </div>
                        </div>
                        <div className='row mt-2'>
                          <div className='col-12'>
                            <div className='green d-inline-block fat-district-bar wasted' style={{width: '20%'}}>10</div>
                            <div className='yellow d-inline-block fat-district-bar wasted' style={{width: '28%', borderRight: 'black 3px dashed'}}>14</div>
                            <div className='yellow d-inline-block fat-district-bar' style={{width: '52%'}}>26</div>
                          </div>
                        </div>
                        <div className="row">
                          <div className='col-12 text-center font-italic mt-2'>
                            Green wasted all 10 votes, but Yellow wasted 14 votes.
                            <br />
                            There were -4 net wasted votes, giving Green a slight advantage.
                          </div>
                        </div>
                      </div>
    },
    {
        title: null,
        context: <div>
                    <p>We can find the efficiency gap by calculating the net wasted votes across all districts,
                        then dividing by the total number of votes.</p>
                    <p>In this example, there are 92 net wasted votes. Divided by the 400 total votes, we
                        find that for this election <strong>the efficiency gap is 0.23</strong></p>
                    <p>This implies that Yellow gained <strong>23% more seats</strong> through gerrymandering. </p>
                    <p>Stephanopoulos and McGhee suggest that efficiency gaps that result in a gain of 2 seats for 
                        Congressional districting plans should be considered presumptively unconstitutional.</p>
                </div>,
        illustration:   <div>
                          <div className="row">
                            <div className='col-12 intro-chart-title mb-2'>
                              Example Election with Wasted Votes
                            </div>
                          </div>
                          <GYAbsoluteDistrictWasted districtNum={1} numGreenVotes={50} numYellowVotes={0} />
                          <GYAbsoluteDistrictWasted districtNum={2} numGreenVotes={40} numYellowVotes={10} />
                          <GYAbsoluteDistrictWasted districtNum={3} numGreenVotes={35} numYellowVotes={15} />
                          <GYAbsoluteDistrictWasted districtNum={4} numGreenVotes={20} numYellowVotes={30} />
                          <GYAbsoluteDistrictWasted districtNum={5} numGreenVotes={20} numYellowVotes={30} />
                          <GYAbsoluteDistrictWasted districtNum={6} numGreenVotes={20} numYellowVotes={30} />
                          <GYAbsoluteDistrictWasted districtNum={7} numGreenVotes={20} numYellowVotes={30} />
                          <GYAbsoluteDistrictWasted districtNum={8} numGreenVotes={15} numYellowVotes={35} />
                          <div className="row">
                            <div className='col-12 text-center font-italic mt-2'>
                              Yellow has an electoral advantage with an efficiency gap of 23%.
                            </div>
                          </div>
                        </div>
    },
    {
        title: <p>Ineffective on small states</p>,
        context: <div>
                    <p>The authors avoid using the efficiency gap on states with <strong>fewer than eight Congressional districts</strong>,
                        stating that "redistricting in smaller states has only a minor influence on the national balance of power".</p>
                    <p>Consider New Hampshire, with two Congressional districts, both narrowly held by Democrats.  
                        The efficiency gap calculation in NH is <strong>0.46</strong>, since it counts all ~300,000 Republican voters 
                        as "packed" into uncompetitive districts.</p>
                    <p>But what would be a "fair" map of New Hampshire? A districting plan with one relatively safe 
                        seat for each party would have a much lower efficiency gap. But would that be
                        a more "fair" representation in a state like NH, which has more Democratic voters?</p>
                </div>,
        illustration: <div>
                        <img src="https://nationalmap.gov/small_scale/printable/images/preview/congdist/pagecgd113_nh.gif" 
                          width="400" alt="New Hampshire Congressional District Map, 113th Congress" className="mx-auto d-block img-fluid"/>
                        <div className="row">
                          <div className='col-10 offset-1 text-center font-italic mt-2'>
                            New Hampshire technically has an efficiency gap of 0.46
                          </div>
                        </div>
                      </div>
    },
    {
        title: <p>Try it yourself!</p>,
        context: <div>
                    <p>If the efficiency gap is the constitutional test of partisan 
                    gerrymandering, it would not be possible to evaluate smaller states. Does this mean it is
                    impossible to unfairly gerrymander them?</p>
                    <div>Do you think you can improve on the efficiency gap calculation?
                      <br />
                      On this site, you can 
                      <ol className='mt-2'>
                        <li>See how severe gerrymandering is across the country</li>
                        <li>Update or create your own algorithm</li>
                        <li>Share it on Twitter and Facebook</li>
                      </ol>
                    </div>
                    <p>Have fun!</p>
                </div>,
        illustration: <div>
                        <img src="./static/img/efficiency_gap_us.png" width="500"
                          alt="Most gerrymandered districts" className="mx-auto d-block img-fluid"/>
                        <div className="row">
                          <div className='col-12 text-center font-italic mt-2'>
                            Visualization of the efficiency gap algorithm
                          </div>
                        </div>
                      </div>
    }
]
