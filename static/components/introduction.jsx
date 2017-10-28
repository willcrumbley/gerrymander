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
        <div className='row mb-5'>
          <div className='mt-0 mb-1 col-lg-6 push-lg-6'>
            {section.illustration}
          </div>
          <div className='mt-4 mb-3 col-lg-6 pull-lg-6'>
            {section.context}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='introduction-column hidden-md-down'></div>
      <h1 className='mb-5'>Partisan Gerrymandering</h1>
      {sections}
    </div>
  )
}

module.exports = Introduction;
