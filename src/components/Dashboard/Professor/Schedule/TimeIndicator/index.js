import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Time from '../../../../../utils/Time';

const TimeIndicator = () => {
  const hours = [
    new Time(8, 0),
    new Time(9, 0),
    new Time(10, 0),
    new Time(11, 0),
    new Time(12, 0),
    new Time(13, 0),
    new Time(14, 0),
    new Time(15, 0),
    new Time(16, 0),
  ];

  return (
    <table className='time-indicator'>
      <tbody>
        {hours.map((hour) => (
          <tr key={uuidv4()}>
            <td>{hour.toString}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TimeIndicator;
