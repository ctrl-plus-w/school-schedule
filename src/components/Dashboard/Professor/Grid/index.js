import React from 'react';
import { useSelector } from 'react-redux';

import TimeIndicator from '../../TimeIndicator';
import Header from '../../Header';
import Corner from '../../Corner';

import Schedule from '../../Schedule';
import EditSchedule from '../../EditSchedule';
import PlanSchedule from '../../PlanSchedule';

import { getConsecutiveDays, resetHours } from '../../../../utils/Calendar';
import Time from '../../../../utils/Time';

import { selectEvents, selectRelatedEvents } from '../../../../features/database/eventsSlice';
import { selectDashboardState, DASHBOARD_STATES, selectWeekInterval } from '../../../../features/infos/infosSlice';

const Grid = () => {
  const events = useSelector(selectEvents);
  const relatedEvents = useSelector(selectRelatedEvents);
  const state = useSelector(selectDashboardState);
  const weekInterval = useSelector(selectWeekInterval);

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

  const { SHOW, EDIT, PLAN } = DASHBOARD_STATES;

  const consecutiveDays = getConsecutiveDays(new Date(weekInterval.start), 5);

  return (
    <div className='grid grid-cols-custom grid-rows-custom gap-px h-full mt-8 bg-gray-300 p-px'>
      <TimeIndicator />
      <Header />
      <Corner />

      {state === SHOW && <Schedule days={consecutiveDays} events={events.map(eventObject)} />}

      {state === EDIT && <EditSchedule days={consecutiveDays} events={events.map(eventObject)} />}

      {state === PLAN && <PlanSchedule days={consecutiveDays} events={[...events, ...relatedEvents].map(eventObject)} />}
    </div>
  );
};

export default Grid;
