import React, { useEffect } from 'react';

import Day from '../Day';

import './index.scss';

// TODO : Add drag to go through days.

const Days = (props) => {
  useEffect(() => {
    console.log('Days component renders.');
  }, []);

  return (
    <div ref={props.elRef} className='days'>
      <div style={{ transform: `translateX(${props.translation}px)` }}>
        {props.days.map((day) => {
          return <Day infos={day} key={day.id} />;
        })}
      </div>
    </div>
  );
};

export default Days;
