import React from 'react';
import { useSelector } from 'react-redux';

import { getConsecutiveDays, resetHours } from '../../../../utils/Calendar';
import Time from '../../../../utils/Time';

import { selectEvents } from '../../../../features/database/eventsSlice';

import TimeIndicator from '../../TimeIndicator';
import Days from '../../Days';
import Header from '../../Header';
import Corner from '../../Corner';

const Schedule = () => {
  const events = useSelector(selectEvents);

  const eventObject = (event) => ({
    id: event.id,
    startDay: resetHours(new Date(event.start)),
    start: Time.timeFromDate(event.start),
    description: event.description,
    link: event.link,
    obligatory: event.obligatory,
    subject: event.subject.subject_name,
    label: event.label.label_name,
    owner: { id: event.owner.id, name: event.owner.full_name },
    color: event.subject.color,
  });

  return (
    <div className='grid grid-cols-custom grid-rows-custom gap-px h-full mt-8 bg-gray-300 p-px'>
      <TimeIndicator />
      <Header />
      <Corner />

      <Days days={getConsecutiveDays(5)} events={events.map(eventObject)} />
    </div>
  );
};

export default Schedule;
