import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { getConsecutiveDays, sameDay } from '../../../utils/Calendar';
import Time from '../../../utils/Time';

import DatabaseContext from '../../../context/database-context';

import TimeIndicator from './TimeIndicator';
import Days from './Days';

import './index.scss';

const Schedule = () => {
  const databaseContext = useContext(DatabaseContext);
  const next14days = getConsecutiveDays(14);

  const events = databaseContext.events.map((event) => ({
    id: event.id,
    start: new Date(event.start),
    subject: event.subject.subject_name,
  }));

  console.log(events);

  const days = next14days.reduce((acc, curr) => {
    const dayEvents = events
      .filter((e) => sameDay(e.start, curr))
      .map((e) => ({ ...e, start: new Time(Time.getLocalHours(e.start), Time.getLocalMins(e.start)), color: 'red' }));

    return [...acc, { id: uuidv4(), date: curr, events: dayEvents }];
  }, []);

  return (
    <div className='schedule'>
      <TimeIndicator />
      <Days days={days} />
    </div>
  );
};

export default Schedule;
