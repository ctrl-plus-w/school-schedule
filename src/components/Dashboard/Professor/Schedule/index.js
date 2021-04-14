import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { getConsecutiveDays, sameDay } from '../../../../utils/Calendar';
import Time from '../../../../utils/Time';

import DatabaseContext from '../../../../context/database-context';
import SelectedEventsContext from '../../../../context/selected-events-context';

import useSelectedEvents from '../../../../hooks/useSelectedEvents';

import TimeIndicator from '../../TimeIndicator';
import Days from './Days';

const eventMapper = (event) => ({
  id: event.id,
  start: new Date(event.start),
  description: event.description,
  link: event.link,
  obligatory: event.obligatory,
  subject: event.subject.subject_name,
  label: event.label.label_name,
  owner: event.owner.full_name,
});

const daysMapper = (events) => {
  return getConsecutiveDays(14).reduce((acc, curr) => {
    const dayEvents = events
      .filter((e) => sameDay(e.start, curr))
      .map((e) => ({ ...e, start: new Time(Time.getLocalHours(e.start), Time.getLocalMins(e.start)), color: 'red' }));

    return [...acc, { id: uuidv4(), date: curr, events: dayEvents }];
  }, []);
};

const Schedule = () => {
  const selectedEvents = useSelectedEvents();

  const databaseContext = useContext(DatabaseContext);

  const events = databaseContext.events.map(eventMapper);
  const days = daysMapper(events);

  return (
    <SelectedEventsContext.Provider value={selectedEvents}>
      <div className='schedule'>
        <TimeIndicator />
        <Days days={days} />
      </div>
    </SelectedEventsContext.Provider>
  );
};

export default Schedule;
