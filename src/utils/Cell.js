import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { arrayInclude } from './Utils';

/**
 * Check if every `property` given of the objects are equals.
 * @param {Object} obj1 The first object to compare.
 * @param {Object} obj2 The second object to compare.
 * @param {Array} properties The properties to compare.
 * @returns A boolean.
 */
export const arePropertyEquals = (obj1, obj2, properties) => {
  for (const property of properties) if (isDifferent(obj1, obj2, property)) return false;
  return true;
};

export const isDifferent = (obj1, obj2, property) => {
  return obj1[property] !== obj2[property];
};

/**
 * Check if the current event is a head of an event list.
 * @param {Object} prev The previous event.
 * @param {Object} curr The current event.
 * @returns A boolean.
 */
export const isHead = (prev, curr) => {
  if (!prev || !curr || curr.empty) return false;

  if (prev.empty && !curr.empty) return true;
  if (isDifferent(curr.owner, prev.owner, 'name')) return true;
  if (!arePropertyEquals(prev, curr, ['description', 'link', 'obligatory', 'subject'])) return true;

  return false;
};

/**
 * Check if the current event is a head and if this event is the only one.
 * @param {Object} prev The previous event.
 * @param {Object} curr The current event.
 * @param {Object} next The next event.
 * @returns A boolean.
 */
export const isHeadAlone = (prev, curr, next) => {
  if (!isHead(prev, curr)) return false;

  if (!next || next.empty) return true;
  if (isDifferent(curr.owner, next.owner, 'name')) return true;
  if (!arePropertyEquals(curr, next, ['description', 'link', 'obligatory', 'subject'])) return true;

  return false;
};

/**
 * Check if the prev and the current events aren't empty.
 * @param {Object} prev The previous event.
 * @param {Object} curr The current event.
 * @returns A boolea.
 */
export const isBody = (prev, curr) => {
  return prev && !prev.empty && curr && !curr.empty;
};

/**
 * Check if the empty event is a head of selected events.
 * @param {Array} selectedEvents The events.
 * @param {Number} col The column of the event in the grid.
 * @param {Number} row The row of the event in the grid.
 * @returns A boolean.
 */
export const isEmptyHead = (selectedEvents, col, row) => {
  return arrayInclude(selectedEvents, [col, row]) && !arrayInclude(selectedEvents, [col, row - 1]);
};

/**
 * Check if the empty event is a head and if this event is the only one selected.
 * @param {Array} selectedEvents The events.
 * @param {Number} col The column of the event in the grid.
 * @param {Number} row The row of the event in the grid.
 * @returns A boolea,
 */
export const isEmptyHeadAlone = (selectedEvents, col, row) => {
  return isEmptyHead(selectedEvents, col, row) && !arrayInclude(selectedEvents, [col, row + 1]);
};

/**
 * Find the farthest event from the head.
 * @param {Array} events The events to find in.
 * @param {Object} event The head event.
 * @returns An event.
 */
export const getTailEvent = (events, event) => {
  const eventIndex = events.findIndex((e) => e.id === event.id);
  const nextEvent = events[eventIndex + 1];

  if (!nextEvent || nextEvent.empty) return event;
  return getTailEvent(events, nextEvent);
};

/**
 * Find the farthest selected event from the head.
 * @param {Array} events The events to find the tail in.
 * @param {Array} coords The col and the row. Format : [col, row].
 * @returns An object.
 */
export const getTail = (events, [col, row]) => {
  if (!events.some(([col_, row_]) => col_ === col && row_ === row + 1)) return row;
  else return getTail(events, [col, row + 1]);
};

/**
 * Find the length between the head (the provided event) and the tail event.
 * @param {Array} events The events.
 * @param {Object} event The head event.
 * @returns A number.
 */
export const getLength = (events, event) => {
  const lastCell = getTailEvent(events, event);
  const timeDifference = lastCell.start.hours - event.start.hours;
  return timeDifference;
};

/**
 * Get all the ids of the event list (by close relation).
 * @param {Array} events The events.
 * @param {Object} event The head event.
 * @returns An array.
 */
export const getBodyIds = (events, event) => {
  const evIndex = events.findIndex(({ id }) => id === event.id);
  const nextEvent = events[evIndex + 1];

  if (!nextEvent || nextEvent.empty) return [event.id];
  return [event.id, ...getBodyIds(events, nextEvent)];
};

/**
 * Get the lines of the schedule grid.
 * @param {Number} amount The amount of required lines.
 * @returns An array of react components.
 */
export const getLines = (amount = 4) => {
  return new Array(amount)
    .fill(0)
    .map((_, i) => (
      <div className={`w-px bg-gray-300 col-start-${(i + 1) * 2} col-end-${(i + 1) * 2 + 1} row-start-1 row-end-10`} key={uuidv4()}></div>
    ));
};

/**
 * Get the tailwind color classes depending on the color provided.
 * @param {String} color The color.
 * @returns A classname string.
 */
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
    case 'gray':
      return 'bg-gray-200 border-gray-800 text-gray-800';
    default:
      return 'bg-gray-200 border-gray-800 text-gray-800';
  }
};
