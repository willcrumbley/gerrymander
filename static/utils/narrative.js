"use strict"

import renderHTML from 'react-render-html';

module.exports = [
    {
        context: renderHTML("<p>The practice of gerrymandering, or drawing electoral districts for an advantage, has \
                    been part of politics in the United States at least since the original \
                    <a href='https://en.wikipedia.org/wiki/Gerrymandering'>Gerry-mander cartoon</a> \
                    from 1812."),
        illustration: renderHTML('<img src="./static/img/gerrymander.png" height="300" width="300" \
                        alt="gerrymander image" class="mx-auto d-block">')
    },
    {
        context: renderHTML('<p>In <a href="https://poseidon01.ssrn.com/delivery.php?ID=177005005066088069091100071103013007009025023051035024067126120026003114011105087081043118057101052027117102030078116010113102021057038082085070005123074018074123007073048112122124116112031089025065116020110087030100066076106120018103082067121125106&EXT=pdf"> \
                    "Partisan Gerrymandering and the Efficiency Gap" (2014)</a>, Stephanopoulos \
                    and McGhee proposed the "efficiency gap" as an impartial standard that could be used to \
                    measure the advantage a party has in the way a state\'s electoral districts are drawn.</p>'),
        illustration: renderHTML('Map will go here'),
    },
    {
        context: renderHTML('<p>As measured by the efficiency gap, partisan gerrymandering has become \
                    significantly worse in recent years.</p>'),
        illustration: renderHTML('<img src="./static/img/Efficiency Gap Over Time.png" width="450" \
                        alt="efficiency gap over time image" class="mx-auto d-block">')
    },
    {
        context: renderHTML('<p>Cases related to partisan gerrymandering have previously been brought before \
                    the Supreme Court, but the Court has rejected all previously proposed legal tests \
                    for gerrymandering.</p>'),
        illustration: renderHTML('Something will go here')
    },
    {
        context: renderHTML('<p>However, the efficiency gap is central to the U.S. Supreme Court\'s consideration of \
                    <i> Gill v. Whitford</i>, the 2017-18 case challenging the 2011 Wisconsin redistricting plan.</p>'),
        illustration: renderHTML('WI map will go here')
    },
    {
        context: renderHTML('<p>The efficiency gap calculation has gained significant attention, as a potential legal\
                    test for partisan gerrymandering, as it purports to calculate "all of the packing and cracking \
                    decisions that go into a district plan" used for gerrymandering.</p>'),
        illustration: renderHTML('main gerrymandering map will go here (8+)')
    },
    {
        context: renderHTML('<p>However, Stephanopoulos and McGhee limit their calculations to those states\
                    with at least eight Congressional districts, stating that "redistricting in smaller states has \
                    only a minor influence on the national balance of power".</p>'),
        illustration: renderHTML('main gerrymandering map will go here (8+)')
    },
    {
        context: renderHTML('<p>After calculating the efficiency gap for states with fewer than 8 Congressional \
                    districts, another concern is evident.</p><p>The efficiency gap is unpredictable for those \
                    smaller states.</p>'),
        illustration: renderHTML('main gerrymandering map will go here (<8, >1)')
    },
    {
        context: renderHTML('<p>Consider New Hampshire, with 2 Congressional districts.  Its efficiency gap, \
                    calculated as of the 2016 election, shows a significant partisan advantage for Democrats, \
                    since both House seats were narrowly won by Democrats.</p>'),
        illustration: renderHTML('NH map closeup, perhaps vote share')
    },
    {
        context: renderHTML('<p>Or take a look at (some other state)....</p>'),
        illustration: renderHTML('state map closeup, perhaps vote share')
    },
    {
        context: renderHTML('<p>This raises the concern that, if the Court were to name the efficiency gap as a \
                    test of the legality of partisan gerrymandering, some states would be ineligible to have their \
                    maps evaluated for legality.</p>'),
        illustration: renderHTML('main gerrymandering map will go here (<8, >1)')
    },
    {
        context: renderHTML('<p>We support the desire to rein in partisan gerrymandering, but we are concerned about \
                    the limitations of the efficiency gap.</p><p>Think you can improve on the calculation? The rest of \
                    this site is designed to allow you to calculate your own measure of gerrymandering, based on state \
                    and district-level data.  Good Luck!</p>'),
        illustration: renderHTML('not sure what will go here')
    },
]