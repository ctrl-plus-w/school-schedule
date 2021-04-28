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

export const getColorStyle = (color) => {
  switch (color) {
    case 'green':
      return 'bg-green-200 border-green-800 text-green-800';
    case 'red':
      return 'bg-red-200 border-red-800 text-red-800';
    case 'purple':
      return 'bg-purple-200 border-purple-800 text-purple-800';
    case 'yellow':
      return 'bg-yellow-200 border-yellow-800 text-yellow-800';
    case 'blue':
      return 'bg-blue-200 border-blue-800 text-blue-800';
    case 'indigo':
      return 'bg-indigo-200 border-indigo-800 text-indigo-800';
    case 'pink':
      return 'bg-pink-200 border-pink-800 text-pink-800';
    default:
      return 'bg-gray-200 border-gray-800 text-gray-800';
  }
};
