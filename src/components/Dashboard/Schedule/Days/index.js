import React, { useEffect, createRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

import Day from '../Day';

import './index.scss';

// TODO : Add drag to go through days.

const Days = (props) => {
  const scrollRef = createRef();

  useEffect(() => {
    if (scrollRef)
      new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        direction: 'horizontal',
      });
  }, []);

  return (
    <div className='days' ref={scrollRef}>
      <div>
        {props.days.map((day) => {
          return <Day infos={day} key={day.id} />;
        })}
      </div>
    </div>
  );
};

export default Days;
