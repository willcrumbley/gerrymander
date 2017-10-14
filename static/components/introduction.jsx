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
        <div>
          {section.context}
        </div>
        <div>
          {section.illustration}
        </div>
      </div>
    )
  }

  return (
    <div>
      {sections}
    </div>
  )
}

module.exports = Introduction;
