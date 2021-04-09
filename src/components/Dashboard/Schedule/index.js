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
  const [translation, setTranslation] = useState(0);

  const daysElRef = createRef();

  const DAY_AMOUNT = 12;
  const INCREMENTER = 100;

  const eventsContext = useContext(EventsContext);
  const next14days = getConsecutiveDays(DAY_AMOUNT);

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

  const getChildInHierachy = (parent, className) => {
    const childs = Array.from(parent.children);
    for (const child of childs) {
      if (Array.from(child.classList).includes(className)) return child;
      return getChildInHierachy(child, className);
    }
  };

  const handleWheel = async (e) => {
    const delta = e.deltaY;
    const totalWidth = daysElRef.current.clientWidth;

    const oneDayEl = getChildInHierachy(daysElRef.current, 'day');
    const daysWidth = oneDayEl.clientWidth * DAY_AMOUNT;

    if (daysWidth < totalWidth) return;

    // TODO : [ ] Handle horizontal scroll.

    // const decrementTranslation = (amount) => {
    //   // if (translation - amount < daysWidth) return setTranslation(0);
    //   setTranslation(translation - amount);
    // };

    // const incrementTranslation = (amount) => {
    //   // if (translation + amount > 0) return setTranslation(0);
    //   setTranslation(translation + amount);
    // };

    // if (delta > 0) decrementTranslation(INCREMENTER);
    // else incrementTranslation(INCREMENTER);
  };

  return (
    <div className='schedule' onWheel={handleWheel}>
      <TimeIndicator />
      <Days elRef={daysElRef} translation={translation} days={days} />
    </div>
  );
};

export default Schedule;
