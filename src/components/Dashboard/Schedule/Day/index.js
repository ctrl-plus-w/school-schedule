import { getElementError } from '@testing-library/dom';
import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import Time from '../../../../utils/Time';
import { getWeekDay } from '../../../../utils/Calendar';

import './index.scss';

// TODO : [ ] Refactor getEventElement function.
// TODO : [ ] Handle event click.

const Day = (props) => {
  const nineArray = new Array(9).fill(0);

  const events = nineArray.reduce((acc, curr, i) => {
    const event = props.infos.events.find((event) => parseInt(event.start.hours) === i + 8);
    if (event) return [...acc, event];
    else return [...acc, { id: uuidv4(), start: new Time(i + 8, 0), empty: true }];
  }, []);

  const getEventElement = (eventsArray, i) => {
    const prev = eventsArray[i - 1];
    const curr = eventsArray[i];
    const next = eventsArray[i + 1];

    const isOneSelected = eventsArray.filter((event) => event?.selected).length > 0;

    if (curr.empty) {
      return <div className={`event empty ${curr.selected ? 'selected' : ''}`} key={curr.id}></div>;
    }

    const defaultClasses = `event ${curr.color}${isOneSelected ? ' blur' : ''}`;

    if (!prev || prev.empty) {
      if (next?.subject === curr.subject) {
        return (
          <div className={`start ${defaultClasses}`} key={curr.id}>
            <h3 className='subject'>{curr.subject}</h3>
            <p className='description'>{curr.start.toString}</p>
          </div>
        );
      }

      return (
        <div className={`normal ${defaultClasses}`} key={curr.id}>
          <h3 className='subject'>{curr.subject}</h3>
          <p className='description'>{curr.start.toString}</p>
        </div>
      );
    }

    if (!next || next.empty) {
      if (prev.subject === curr.subject) {
        return <div className={`end ${defaultClasses}`} key={curr.id}></div>;
      }
    }

    // If next is an event and prev as well.
    if (!next.empty && !prev.empty) {
      if (next.subject === curr.subject && prev.subject === curr.subject && prev.subject === next.subject) {
        return <div className={`middle ${defaultClasses}`} key={curr.id}></div>;
      }

      if (prev.subject === curr.subject && curr.subject !== next.subject) {
        return <div className={`end ${defaultClasses}`} key={curr.id}></div>;
      }

      if (prev.subject !== curr.subject && curr.subject === next.subject) {
        return (
          <div className={`middle ${defaultClasses}`} key={curr.id}>
            <h3 className='subject'>{curr.subject}</h3>
            <p className='description'>{curr.start.toString}</p>
          </div>
        );
      }
    }

    return (
      <div className={`end ${defaultClasses}`} key={curr.id}>
        <h3 className='subject'>{curr.subject}</h3>
        <p className='description'>{curr.start.toString}</p>
      </div>
    );
  };

  return (
    <div className='day'>
      <div className='header'>
        <h3 className='title'>{getWeekDay(props.infos.date)}</h3>
      </div>
      <div className='events'>{events.map((el, i) => getEventElement(events, i))}</div>
    </div>
  );
};

export default Day;
