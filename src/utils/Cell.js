import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const isHead = (prev, curr) => {
  return prev && prev.empty && curr && !curr.empty;
};

export const isHeadAlone = (prev, curr, next) => {
  return prev && prev.empty && curr && !curr.empty && (!next || next.empty);
};

export const getLastCloseEvent = (events, event) => {
  const eventIndex = events.findIndex((e) => e.id === event.id);
  const nextEvent = events[eventIndex + 1];

  if (!nextEvent || nextEvent.empty) return event;
  return getLastCloseEvent(events, nextEvent);
};

export const getLength = (events, event) => {
  const lastCell = getLastCloseEvent(events, event);
  const timeDifference = lastCell.start.hours - event.start.hours;
  return timeDifference;
};

export const getLines = (amount = 4) => {
  return new Array(amount)
    .fill(0)
    .map((_, i) => (
      <div className={`w-px bg-gray-300 col-start-2=${(i + 1) * 2} col-end-${(i + 1) * 2 + 1} row-start-1 row-end-10`} key={uuidv4()}></div>
    ));
};
