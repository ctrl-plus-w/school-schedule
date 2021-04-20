import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { getConsecutiveDays, sameDay } from '../../../../utils/Calendar';
import Time from '../../../../utils/Time';

import { selectEvents } from '../../../../features/database/eventsSlice';

import TimeIndicator from '../../TimeIndicator';
import Days from './Days';

const Schedule = () => {
  const events = useSelector(selectEvents);

  const getTime = (time) => new Time(Time.getLocalHours(new Date(time)), Time.getLocalMins(new Date(time)));

  const setToMidnight = (date) => {
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const eventObject = (event) => ({
    id: event.id,
    startDay: setToMidnight(new Date(event.start)),
    start: getTime(event.start),
    description: event.description,
    link: event.link,
    obligatory: event.obligatory,
    subject: event.subject.subject_name,
    label: event.label.label_name,
    owner: { id: event.owner.id, fullName: event.owner.full_name },
    color: 'red',
  });

  const days = getConsecutiveDays(14).reduce((acc, curr) => {
    const dayEvents = events.map(eventObject).filter((e) => sameDay(e.startDay, curr));
    return [...acc, { id: uuidv4(), date: setToMidnight(curr), events: dayEvents }];
  }, []);

  return (
    <div className='schedule'>
      <TimeIndicator />
      <Days days={days} />
    </div>
  );
};

export default Schedule;
