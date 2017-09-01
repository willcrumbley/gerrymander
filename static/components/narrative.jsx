"use strict"

import React from 'react';

module.exports = [
    {
        title: <p>The efficiency gap, a proposed measure of unconstitutional partisan gerrymandering.</p>,
        context: <div>
                    <p>The practice of gerrymandering, or drawing electoral districts to give an advantage to 
                        a party or group, has been a part of democratic politics for at least two centuries.</p>
                    <p>The <a href='https://en.wikipedia.org/wiki/Gerrymandering'> Gerry-mander cartoon </a>
                        from 1812 satirized the appearance of one district with particularly creative 
                        boundaries.</p>
                </div>,
        illustration: <img src="./static/img/gerrymander.png" width="300"
                        alt="Original 1812 Gerrymander cartoon" className="mx-auto d-block img-fluid"/>
    },
    {
        title: <p>Why should I care?</p>,
        context: <div>
                    <p>Excessive partisan gerrymandering can lead to extreme partisanship, as
                        it reduces the competitiveness of elections.</p>
                    <p>Partisan gerrymandering has become significantly worse in recent years.</p>
                    <p>However, all previous legal tests for gerrymandering brought before the Supreme Court 
                        have been rejected.</p>
                 </div>,
        illustration:   <div>
                            <img src="./static/img/Efficiency Gap Over Time.png" width="400"
                            alt="Graph of Efficiency Gap getting worse over time" className="mx-auto d-block img-fluid"/>
                            <div>Source: Stephanopoulos and McGhee (2014), <i>Partisan Gerrymandering and the Efficiency Gap.</i></div>
                        </div>
    },
    {
        title: <p>What's the efficiency gap?</p>,
        context: <div>
                    <p>In <a href="https://poseidon01.ssrn.com/delivery.php?ID=177005005066088069091100071103013007009025023051035024067126120026003114011105087081043118057101052027117102030078116010113102021057038082085070005123074018074123007073048112122124116112031089025065116020110087030100066076106120018103082067121125106&EXT=pdf">
                    "Partisan Gerrymandering and the Efficiency Gap" (2014)</a>, Stephanopoulos
                    and McGhee proposed the "efficiency gap" as an impartial standard that could be used to
                    measure a political party's advantage in the way a state's electoral districts are drawn.</p>
                    <p>The efficiency gap is central to the U.S. Supreme Court's consideration of
                    <i> Gill v. Whitford</i>, the 2017-18 case challenging the 2011 Wisconsin redistricting plan.</p>
                </div>,
        illustration: <img src="https://nationalmap.gov/small_scale/printable/images/preview/congdist/pagecgd113_wi.gif" 
                        width="400" alt="Wisconsin Congressional District Map, 113th Congress" className="mx-auto d-block img-fluid"/>
    },
    {
        title: <p>How is the efficiency gap calculated? (1/4)</p>,
        context: <div>
                    <p>Imagine a state containing 250 voters, arranged geographically like this diagram.</p>
                    <p>If we needed to create 5 Congressional districts in this state, for example, these voters 
                        could be grouped together in a number of ways. Different ways of grouping the voters could
                        easily advantage one party or another in elections.</p>
                </div>,
        illustration:   <div className='row'>
                            <div className='col-1 col-sm-2 '></div>
                            <div className='col-2 red'>10 R</div>
                            <div className='col-2 red'>10 R</div>
                            <div className='col-2 blue'>10 D</div>
                            <div className='col-2 red'>10 R</div>
                            <div className='col-2 red'>10 R</div>
                            <div className='col-1 col-sm-2 '></div>
                            <div className='col-2 blue'>10 D</div>
                            <div className='col-2 red'>10 R</div>
                            <div className='col-2 blue'>10 D</div>
                            <div className='col-2 blue'>10 D</div>
                            <div className='col-2 blue'>10 D</div>
                            <div className='col-1 col-sm-2 '></div>
                            <div className='col-2 red'>10 R</div>
                            <div className='col-2 red'>10 R</div>
                            <div className='col-2 red'>10 R</div>
                            <div className='col-2 blue'>10 D</div>
                            <div className='col-2 blue'>10 D</div>
                            <div className='col-1 col-sm-2 '></div>
                            <div className='col-2 red'>10 R</div>
                            <div className='col-2 blue'>10 D</div>
                            <div className='col-2 blue'>10 D</div>
                            <div className='col-2 blue'>10 D</div>
                            <div className='col-2 blue'>10 D</div>
                            <div className='col-1 col-sm-2 '></div>
                            <div className='col-2 blue'>10 D</div>
                            <div className='col-2 blue'>10 D</div>
                            <div className='col-2 blue'>10 D</div>
                            <div className='col-2 blue'>10 D</div>
                            <div className='col-2 blue'>10 D</div>
                        </div>
    },
    {
        title: <p>How is the efficiency gap calculated? (2/4)</p>,
        context: <div>
                    <p>For the same of simpliclity, let's divide the state horizontally into 5 districts. In this grouping,
                        Democrats would have won three seats to the Republicans' two.</p>
                    <p>The efficiency gap attempts to <strong>compare</strong> the number of 'wasted votes' 
                        <strong> for the two parties</strong>, across a state.  Wasted votes are either:
                        <ul>
                            <li>Votes for the winning party in a district, in excess of the 50% + 1 needed to win.</li>
                            <li>Votes for the losing party in a district.</li>
                        </ul>
                    </p>
                    <p>Let's see how this works in practice.</p>
                </div>,
        illustration:   <div className='row'>
                            <div className='col-1 col-sm-2 mb-2'>1</div>
                            <div className='col-2 mb-2 red'>10 R</div>
                            <div className='col-2 mb-2 red'>10 R</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-2 mb-2 red'>10 R</div>
                            <div className='col-2 mb-2 red'>10 R</div>
                            <div className='col-1 col-sm-2 mb-2'>2</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-2 mb-2 red'>10 R</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-1 col-sm-2 mb-2'>3</div>
                            <div className='col-2 mb-2 red'>10 R</div>
                            <div className='col-2 mb-2 red'>10 R</div>
                            <div className='col-2 mb-2 red'>10 R</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-1 col-sm-2 mb-2'>4</div>
                            <div className='col-2 mb-2 red'>10 R</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-1 col-sm-2 mb-2'>5</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
                            <div className='col-2 mb-2 blue'>10 D</div>
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
                        difference in wasted votes between the parties (48), divided by the total votes in
                        the state (250), gives the state's efficiency gap of 0.192.</p>
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
        title: <p>The calculation excludes small states.</p>,
        context: <div>
                    <p>The efficiency gap calculation has gained significant attention as a legal
                        test for partisan gerrymandering, as it purports to calculate "all of the packing and cracking
                        decisions that go into a district plan" used for gerrymandering.</p>
                    <p>However, Stephanopoulos and McGhee limit their calculations to those states
                        with at least eight Congressional districts, stating that "redistricting in smaller states has
                        only a minor influence on the national balance of power".</p>
                </div>,
        illustration: <div>
                        <img src="./static/img/efficiency-gap-ge-8.png" width="450"
                            alt="Map of US States with calculated efficiency gap" className="mx-auto d-block img-fluid"/>
                        <div className='text-center'>
                            <p> States with fewer than 8 districts shown in gray. Red states are gerrymandered to 
                                favor Republicans, blue states Democrats.</p>
                        </div>
                      </div>,
    },
    {
        title: <p>What is 'fair' in a small state?</p>,
        context: <div>
                    <p>When we calculate the efficiency gap for states with fewer than 8 Congressional
                        districts, however, we notice that their Congressional district 
                        maps would be unconstitutional.</p>
                    <p>Consider New Hampshire, with 2 Congressional districts, both narrowly held by Democrats.  
                        Because the efficiency gap calculation counts all ~300,000 Republican voters as "packed"
                        into uncompetitive districts, the efficiency gap in NH shows a significant partisan 
                        advantage for Democrats.</p>
                    <p>But what would be a 'fair' map of New Hampshire?</p>
                </div>,
        illustration: <img src="https://nationalmap.gov/small_scale/printable/images/preview/congdist/pagecgd113_nh.gif" 
                        width="400" alt="New Hampshire Congressional District Map, 113th Congress" className="mx-auto d-block img-fluid"/>,
    },
    {
        title: <p>Try it yourself!</p>,
        context: <div>
                    <p>If the Court names the efficiency gap as the only test of the constitutionality of partisan 
                    gerrymandering, smaller states' maps would be unable to be evaluated. Does this mean it is
                    impossible to gerrymander small states, or just to evaluate them?</p>
                    <p>Do you think you can improve on the efficiency gap calculation? On this site, you can 
                    (1) update or create your own algorithm, (2) see how severe gerrymandering is, according to 
                    that algorithm, and (3) share it on Twitter and Facebook.</p>
                    <p>Good Luck!</p>
                </div>,
        illustration: <img src="./static/img/instructions-400.png" height="300"
                        alt="instructions for using site" className="mx-auto d-block img-fluid"/>
    }
]