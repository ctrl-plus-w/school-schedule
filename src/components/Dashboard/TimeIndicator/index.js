import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Time from '../../../utils/Time';

class TimeIndicator extends Component {
  constructor() {
    super();

    this.state = {
      hours: [
        new Time(8, 0),
        new Time(9, 0),
        new Time(10, 0),
        new Time(11, 0),
        new Time(12, 0),
        new Time(13, 0),
        new Time(14, 0),
        new Time(15, 0),
        new Time(16, 0),
      ],
    };
  }

  render() {
    return (
      <div className='grid grid-cols-1 grid-rows-9 col-start-1 col-end-2 row-start-2 row-end-11 px-2 bg-white'>
        {this.state.hours.map((hour, i) => (
          <div key={uuidv4()} className={`col-start-1 row-start-${i + 1} pt-2`}>
            <p className='text-sm text-gray-400 font-bold text-center w-full'>{hour.toString}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default TimeIndicator;
