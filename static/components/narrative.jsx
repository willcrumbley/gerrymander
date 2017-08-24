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
                        alt="Original 1812 Gerrymander cartoon" className="mx-auto d-block"/>
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
        illustration: <img src="./static/img/Efficiency Gap Over Time.png" width="400"
                        alt="Graph of Efficiency Gap getting worse over time" className="mx-auto d-block"/>
    },
    {
        title: <p>What's the Efficiency Gap?</p>,
        context: <div>
                    <p>In <a href="https://poseidon01.ssrn.com/delivery.php?ID=177005005066088069091100071103013007009025023051035024067126120026003114011105087081043118057101052027117102030078116010113102021057038082085070005123074018074123007073048112122124116112031089025065116020110087030100066076106120018103082067121125106&EXT=pdf">
                    "Partisan Gerrymandering and the Efficiency Gap" (2014)</a>, Stephanopoulos
                    and McGhee proposed the "efficiency gap" as an impartial standard that could be used to
                    measure a political party's advantage in the way a state's electoral districts are drawn.</p>
                    <p>The efficiency gap is central to the U.S. Supreme Court's consideration of
                    <i> Gill v. Whitford</i>, the 2017-18 case challenging the 2011 Wisconsin redistricting plan.</p>
                </div>,
        illustration: <img src="https://nationalmap.gov/small_scale/printable/images/preview/congdist/pagecgd113_wi.gif" 
                        width="400" alt="Wisconsin Congressional District Map, 113th Congress" className="mx-auto d-block"/>
    },
    {
        title: <p>A limitation</p>,
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
                            alt="Map of US States with calculated efficiency gap" className="mx-auto d-block"/>
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
                        width="400" alt="New Hampshire Congressional District Map, 113th Congress" className="mx-auto d-block"/>,
    },
    {
        title: <p>Try it yourself!</p>,
        context: <div>
                    <p>If the Court names the efficiency gap as the only test of the constitutionality of partisan 
                    gerrymandering, smaller states' maps would be unable to be evaluated. Does this mean it is
                    impossible to gerrymander small states, or just to evaluate it?</p>
                    <p>Do you think you can improve on the efficiency gap calculation? On this site, you can 
                    (1) update or create your own algorithm, (2) see how severe gerrymandering is, according to 
                    that algorithm, and (3) share it on Twitter and Facebook.</p>
                    <p>Good Luck!</p>
                </div>,
        illustration: <img src="./static/img/instructions-400.png" height="300"
                        alt="instructions for using site" className="mx-auto d-block"/>
    }
]