import React from 'react';

import narrative from './narrative.jsx';


const Introduction = (props) => {
  let sections = [];

  for(let i=0; i < narrative.length; i++) {
    let section = narrative[i];
    sections.push(
      <div key={i}>
        <h2>
          {section.title}
        </h2>
        <div className='row'>
          <div className='my-5 col-md-6 push-md-6'>
            {section.illustration}
          </div>
          <div className='my-5 col-md-6 pull-md-6'>
            {section.context}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div></div>
      <h1>Measuring Partisan Gerrymandering</h1>
      {sections}
    </div>
  )
}

module.exports = Introduction;
