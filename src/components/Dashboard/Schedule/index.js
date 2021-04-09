import React, { useState, useContext, createRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

// import Time from '../../../utils/Time';

import { getConsecutiveDays, sameDay } from '../../../utils/Calendar';
import Time from '../../../utils/Time';

import EventsContext from '../../../context/events-context';

// import Infobar from './Infobar';
import Days from './Days';
import TimeIndicator from './TimeIndicator';

import './index.scss';

const Schedule = () => {
  const eventsContext = useContext(EventsContext);
  const next14days = getConsecutiveDays(14);

  const events = eventsContext.map((event) => ({
    id: event.id,
    start: new Date(event.start),
    subject: event.subject.subject_name,
  }));

  const days = next14days.reduce((acc, curr, i) => {
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
