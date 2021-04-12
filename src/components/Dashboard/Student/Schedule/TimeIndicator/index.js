import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

// import './index.scss';

import Time from '../../../../../utils/Time';

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
      <table className='time-indicator'>
        <tbody>
          {this.state.hours.map((hour) => (
            <tr key={uuidv4()}>
              <td>{hour.toString}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default TimeIndicator;
