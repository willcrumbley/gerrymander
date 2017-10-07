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
 * Render a single Wisconsin district for visualization.
 *
 * @param districtNum - Number of the district to render
 * @param marginOfVictory - Percentage margin of victory (0-100)
 * @param winner - Either 'red' or 'blue'
 */
function renderWisconsinDistrict(districtNum, marginOfVictory, winner) {
  let percentages = {
    red: _getVotePercent(marginOfVictory, (winner == 'red')),
    blue: _getVotePercent(marginOfVictory, (winner == 'blue'))
  };

  return (
    <div className='row mt-1'>
      <div className='col-sm-2 text-center' style={{height: '30px'}}>{districtNum}</div>
      <div className='col-10' style={{height: '30px'}}>
        <div className='red d-inline-block' style={{width: `${percentages.red}%`}}>{percentages.red}%</div>
        <div className='blue d-inline-block' style={{width: `${percentages.blue}%`}}>{percentages.blue}%</div>
      </div>
    </div>
  );
};

function renderAllWisconsinDistricts() {
  return (<div>
      {WISCONSIN_RESULTS.map((obj, index) => {
        return renderWisconsinDistrict(index + 1, obj.marginOfVictory, obj.winner);
      })}
    </div>
  );
}

module.exports = [
    {
        title: <span></span>,
        context: <div>
                    <p>Gerrymandering, the practice of drawing electoral districts to give an advantage to 
                        a party or group, has been a part of U.S. politics for at least two centuries.</p>
                    <p>The <a href='https://en.wikipedia.org/wiki/Gerrymandering'> Gerry-mander cartoon </a>
                        from 1812 satirized the appearance of one district with particularly creative 
                        boundaries.</p>
                </div>,
        illustration: <img src="./static/img/gerrymander.png" width="300"
                        alt="Original 1812 Gerrymander cartoon" className="mx-auto d-block img-fluid"/>
    },
    {
        title: <p>Unconstitutional?</p>,
        context: <div>
                    <p>In extreme cases, partisan gerrymandering can be used to decrease electoral competition,
                       or to grant one party a disproportionate number of seats in state legislatures</p>
                    <p>This has raised the question of whether there is an extent of gerrymandering that should
                       be considered unconstitutional under the Equal Protection clause of the constitution. However, there is no
                       agreed-upon standard on how to measure it.</p>
                    <p>There have been several attempts to propose legal tests for unconstitutional gerrymandering,
                       but the Supreme Court has rejected all of them to date.</p>
                 </div>,
        illustration:   <div>
                          <div className="row">
                            <div className='col-10 offset-2 text-center font-weight-bold mb-2' style={{fontSize: '20px'}}>
                              Gerrymandering Green vs Yellow
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-1 col-sm-2 text-center'>District 1</div>
                            <div className='col-2 yellow'>10 </div>
                            <div className='col-2 yellow'>10 </div>
                            <div className='col-2 green'>10 </div>
                            <div className='col-2 green'>10 </div>
                            <div className='col-2 green'>10 </div>
                          </div>

                          <div className='row mt-2'>
                            <div className='col-1 col-sm-2 text-center'>District 2</div>
                            <div className='col-2 green'>10 </div>
                            <div className='col-2 yellow'>10 </div>
                            <div className='col-2 green'>10 </div>
                            <div className='col-2 yellow'>10 </div>
                            <div className='col-2 green'>10 </div>
                          </div>

                          <div className='row mt-2'>
                            <div className='col-1 col-sm-2 text-center'>District 3</div>
                            <div className='col-2 green'>10 </div>
                            <div className='col-2 yellow'>10 </div>
                            <div className='col-2 yellow'>10 </div>
                            <div className='col-2 green'>10 </div>
                            <div className='col-2 green'>10 </div>
                          </div>

                          <div className='row mt-2'>
                            <div className='col-1 col-sm-2 text-center'>District 4</div>
                            <div className='col-2 green'>10 </div>
                            <div className='col-2 green'>10 </div>
                            <div className='col-2 yellow'>10 </div>
                            <div className='col-2 green'>10 </div>
                            <div className='col-2 yellow'>10 </div>
                          </div>

                          <div className='row mt-2'>
                            <div className='col-1 col-sm-2 text-center'>District 5</div>
                            <div className='col-2 yellow'>10 </div>
                            <div className='col-2 green'>10 </div>
                            <div className='col-2 green'>10 </div>
                            <div className='col-2 yellow'>10 </div>
                            <div className='col-2 green'>10 </div>
                          </div>
                          <div className="row">
                            <div className='col-10 offset-2 text-center font-italic mt-2'>
                              Green won 60% of the votes, but 100% of the seats.
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
                            <div className='col-10 offset-2 text-center font-weight-bold mb-2' style={{fontSize: '20px'}}>
                              2016 Wisconsin House of Representatives Election Results
                            </div>
                          </div>
                          {renderAllWisconsinDistricts()}
                          <div className="row">
                            <div className='col-10 offset-2 text-center font-italic mt-2'>
                              Republicans won {PERCENTAGE_RED_VOTES}% of the votes, but {PERCENTAGE_RED_SEATS}% of the seats.
                              (<a href="https://ballotpedia.org/Redistricting_in_Wisconsin#State_legislative_maps" target='_blank'>data</a>)
                            </div>
                          </div>
                        </div>
    },
    {
        title: <p>How is the efficiency gap calculated? (1/4)</p>,
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
                          <div className='row' style={{height: '30px'}}>
                            <div className='col-2 text-center'> 1 </div>
                            <div className='col-10'>
                              <div className='green d-inline-block' style={{width: '100%'}}>50</div>
                              <div className='yellow d-inline-block'></div>
                            </div>
                          </div>
                          <div className='row mt-2' style={{height: '30px'}}>
                            <div className='col-2 text-center'> 2 </div>
                            <div className='col-10'>
                              <div className='green d-inline-block' style={{width: '80%'}}>40</div>
                              <div className='yellow d-inline-block' style={{width: '20%'}}>10</div>
                            </div>
                          </div>
                          <div className='row mt-2' style={{height: '30px'}}>
                            <div className='col-2 text-center'> 3 </div>
                            <div className='col-10'>
                              <div className='green d-inline-block' style={{width: '70%'}}>35</div>
                              <div className='yellow d-inline-block' style={{width: '30%'}}>15</div>
                            </div>
                          </div>
                          <div className='row mt-2' style={{height: '30px'}}>
                            <div className='col-2 text-center'> 4 </div>
                            <div className='col-10'>
                              <div className='green d-inline-block' style={{width: '40%'}}>20</div>
                              <div className='yellow d-inline-block' style={{width: '60%'}}>30</div>
                            </div>
                          </div>
                          <div className='row mt-2' style={{height: '30px'}}>
                            <div className='col-2 text-center'> 5 </div>
                            <div className='col-10'>
                              <div className='green d-inline-block' style={{width: '40%'}}>20</div>
                              <div className='yellow d-inline-block' style={{width: '60%'}}>30</div>
                            </div>
                          </div>
                          <div className='row mt-2' style={{height: '30px'}}>
                            <div className='col-2 text-center'> 6 </div>
                            <div className='col-10'>
                              <div className='green d-inline-block' style={{width: '40%'}}>20</div>
                              <div className='yellow d-inline-block' style={{width: '60%'}}>30</div>
                            </div>
                          </div>
                          <div className='row mt-2' style={{height: '30px'}}>
                            <div className='col-2 text-center'> 7 </div>
                            <div className='col-10'>
                              <div className='green d-inline-block' style={{width: '40%'}}>20</div>
                              <div className='yellow d-inline-block' style={{width: '60%'}}>30</div>
                            </div>
                          </div>
                          <div className='row mt-2' style={{height: '30px'}}>
                            <div className='col-2 text-center'> 8 </div>
                            <div className='col-10'>
                              <div className='green d-inline-block' style={{width: '30%'}}>15</div>
                              <div className='yellow d-inline-block' style={{width: '70%'}}>35</div>
                            </div>
                          </div>
                          <div className="row">
                            <div className='col-10 offset-2 text-center font-italic mt-2'>
                              Yellow won 45% of the votes, but 62.5% of the seats.
                            </div>
                          </div>
                        </div>
    },
    {
        title: <p>How is the efficiency gap calculated? (2/4)</p>,
        context: <div>
                    <p>The efficiency gap attempts to compare the number of <strong>'wasted votes'</strong> across
                        a state. Wasted votes in a district are either:
                        <ul>
                            <li className='mt-1'>Votes for the winning party in excess of the 50% + 1 <br /> needed to win.</li>
                            <li className='mt-1'>Votes for the losing party</li>
                        </ul>
                    </p>
                    <p>These votes are considered 'wasted' because they could have been more effectively used in other districts.</p>
                </div>,
        illustration: <div>
                        <div className='row mt-2'>
                          <div className='col-12'>
                            <div className='green d-inline-block fat-district-bar wasted' style={{width: '20%'}}>10</div>
                            <div className='yellow d-inline-block fat-district-bar wasted' style={{width: '28%', 'border-right': 'black 3px dashed'}}>14</div>
                            <div className='yellow d-inline-block fat-district-bar' style={{width: '52%'}}>26</div>
                          </div>
                        </div>
                        <div className="row">
                          <div className='col-12 text-center font-italic mt-2'>
                            Green wasted all 10 votes, but Yellow wasted 14 votes.
                            <br />
                            There were -4 net wasted votes, giving Green an advantage.
                          </div>
                        </div>
                      </div>
    },
    {
        title: <p>How is the efficiency gap calculated? (3/4)</p>,
        context: <div>
                    <p>In district 1, all 10 Democratic votes are counted as 'wasted', since they are votes 
                        for the losing party.</p>
                    <p>Similarly, since the Republican candidate only needed 50% + 1 votes, or 26, votes to win,
                        we count 40 - 26 = 14 of the Republican votes as wasted.</p>
                </div>,
        illustration:   <div className='row'>
                            <div className='col-1 col-sm-2 mb-2'>1</div>
                            <div className='col-2 mb-2 red'>10 R</div>
                            <div className='col-2 mb-2 red'>10 R</div>
                            <div className='col-2 mb-2 blue wasted'>10 D</div>
                            <div className='col-1 mb-2 red'>6 R</div>
                            <div className='col-1 mb-2 red wasted'>4 R</div>
                            <div className='col-2 mb-2 red wasted'>10 R</div>
                            <div className='col-1 col-sm-2 mb-2'>2</div>
                            <div className='col-2 mb-2 deemphasize'>10 D</div>
                            <div className='col-2 mb-2 deemphasize'>10 R</div>
                            <div className='col-2 mb-2 deemphasize'>10 D</div>
                            <div className='col-2 mb-2 deemphasize'>10 D</div>
                            <div className='col-2 mb-2 deemphasize'>10 D</div>
                            <div className='col-1 col-sm-2 mb-2'>3</div>
                            <div className='col-2 mb-2 deemphasize'>10 R</div>
                            <div className='col-2 mb-2 deemphasize'>10 R</div>
                            <div className='col-2 mb-2 deemphasize'>10 R</div>
                            <div className='col-2 mb-2 deemphasize'>10 D</div>
                            <div className='col-2 mb-2 deemphasize'>10 D</div>
                            <div className='col-1 col-sm-2 mb-2'>4</div>
                            <div className='col-2 mb-2 deemphasize'>10 R</div>
                            <div className='col-2 mb-2 deemphasize'>10 D</div>
                            <div className='col-2 mb-2 deemphasize'>10 D</div>
                            <div className='col-2 mb-2 deemphasize'>10 D</div>
                            <div className='col-2 mb-2 deemphasize'>10 D</div>
                            <div className='col-1 col-sm-2 mb-2'>5</div>
                            <div className='col-2 mb-2 deemphasize'>10 D</div>
                            <div className='col-2 mb-2 deemphasize'>10 D</div>
                            <div className='col-2 mb-2 deemphasize'>10 D</div>
                            <div className='col-2 mb-2 deemphasize'>10 D</div>
                            <div className='col-2 mb-2 deemphasize'>10 D</div>
                        </div>
    },
    {
        title: <p>How is the efficiency gap calculated? (4/4)</p>,
        context: <div>
                    <p>We apply the same calculation across all the districts in the state, and then sum
                        wasted votes for each party across the whole state.</p>
                    <ul>
                        <li>District 1: 14R, 10D</li>
                        <li>District 2: 10R, 14D</li>
                        <li>District 3:  4R, 20D</li>
                        <li>District 4: 10R, 14D</li>
                        <li>District 5:  0R, 24D</li>
                    </ul>
                    <p>Across this hypothetical state, there are 34 wasted R votes and 82 wasted D votes. The
                        difference in wasted votes between the parties (82 - 34 = 48), divided by the total votes in
                        the state (250), gives the state's efficiency gap of 0.192. Multiplying by the number of 
                        total districts (5) gives an estimate of 0.96 seats gained through gerrymandering.</p>
                    <p>Stephanopoulos and McGhee suggest that efficiency gaps that result in a gain of 2 seats for 
                        Congressional districting plans should be considered presumptively unconstitutional.</p>
                </div>,
        illustration:   <div className='row'>
                            <div className='col-1 col-sm-2 mb-2'>1</div>
                            <div className='col-2 mb-2 red'>10 R</div>
                            <div className='col-2 mb-2 red'>10 R</div>
                            <div className='col-2 mb-2 blue wasted'>10 D</div>
                            <div className='col-1 mb-2 red'>6 R</div>
                            <div className='col-1 mb-2 red wasted'>4 R</div>
                            <div className='col-2 mb-2 red wasted'>10 R</div>
                            <div className='col-1 col-sm-2 mb-2'>2</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-2 mb-2 red wasted'>10 R</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-1 mb-2 blue'>6 D</div>
                            <div className='col-1 mb-2 blue wasted'>4 D</div>
                            <div className='col-2 mb-2 blue wasted'>10 D</div>
                            <div className='col-1 col-sm-2 mb-2'>3</div>
                            <div className='col-2 mb-2 red'>10 R</div>
                            <div className='col-2 mb-2 red'>10 R</div>
                            <div className='col-1 mb-2 red'>6 R</div>
                            <div className='col-1 mb-2 red wasted'>4 R</div>
                            <div className='col-2 mb-2 blue wasted'>10 D</div>
                            <div className='col-2 mb-2 blue wasted'>10 D</div>
                            <div className='col-1 col-sm-2 mb-2'>4</div>
                            <div className='col-2 mb-2 red wasted'>10 R</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-1 mb-2 blue'>6 D</div>
                            <div className='col-1 mb-2 blue wasted'>4 D</div>
                            <div className='col-2 mb-2 blue wasted'>10 D</div>
                            <div className='col-1 col-sm-2 mb-2'>5</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-1 mb-2 blue'>6 D</div>
                            <div className='col-1 mb-2 blue wasted'>4 D</div>
                            <div className='col-2 mb-2 blue wasted'>10 D</div>
                            <div className='col-2 mb-2 blue wasted'>10 D</div>
                        </div>
    },
    {
        title: <p>The calculation excludes small states</p>,
        context: <div>
                    <p>The efficiency gap calculation has gained significant attention as a legal
                        test for partisan gerrymandering, as it purports to calculate "all of the packing and cracking
                        decisions that go into a district plan" used for gerrymandering.</p>
                    <p>However, the authors limit their calculations to those states
                        with at least eight Congressional districts, stating that "redistricting in smaller states has
                        only a minor influence on the national balance of power".</p>
                </div>,
        illustration: <div>
                        <img src="./static/img/efficiency-gap-ge-8.png" width="450"
                            alt="Map of US States with calculated efficiency gap" className="mx-auto d-block img-fluid"/>
                        <div className='text-center smaller'>
                            <p> States with fewer than eight Congressional districts shown in gray. Red states are gerrymandered to 
                                favor Republicans, blue states Democrats.</p>
                        </div>
                      </div>,
    },
    {
        title: <p>What is 'fair' in a small state?</p>,
        context: <div>
                    <p>Consider New Hampshire, with two Congressional districts, both narrowly held by Democrats.  
                        The efficiency gap calculation in NH is 0.46, since it counts all ~300,000 Republican voters 
                        as "packed" into uncompetitive districts.</p>
                    <p>But what would be a 'fair' map of New Hampshire? A districting plan with one relatively safe 
                        seat for each party would have a much lower efficiency gap. But would that be
                        a more 'fair' representation in a state like NH, which has more Democratic voters?</p>
                </div>,
        illustration: <img src="https://nationalmap.gov/small_scale/printable/images/preview/congdist/pagecgd113_nh.gif" 
                        width="400" alt="New Hampshire Congressional District Map, 113th Congress" className="mx-auto d-block img-fluid"/>,
    },
    {
        title: <p>Try it yourself!</p>,
        context: <div>
                    <p>If the efficiency gap is the constitutional test of partisan 
                    gerrymandering, smaller states' maps would be unable to be evaluated. Does this mean it is
                    impossible to gerrymander small states?</p>
                    <p>Do you think you can improve on the efficiency gap calculation? On this site, you can 
                    (1) update or create your own algorithm, (2) see how severe gerrymandering is, according to 
                    that algorithm, and (3) share it on Twitter and Facebook.</p>
                    <p>Good Luck!</p>
                </div>,
        illustration: <img src="./static/img/instructions-400.png" height="300"
                        alt="instructions for using site" className="mx-auto d-block img-fluid"/>
    }
]
