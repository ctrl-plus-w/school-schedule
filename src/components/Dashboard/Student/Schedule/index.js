import React from 'react';

import { getConsecutiveDays, resetHours } from '../../../../utils/Calendar';
import Time from '../../../../utils/Time';

import TimeIndicator from '../../TimeIndicator';
import Days from '../../Days';
import Header from '../../Header';
import Corner from '../../Corner';

import { useSelector } from 'react-redux';
import { selectEvents } from '../../../../features/database/eventsSlice';

// TODO : [ ] Fetch the week day instead of the 5 next days. (if week end, fetch the next week)

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
    owner: { name: event.owner.full_name },
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
