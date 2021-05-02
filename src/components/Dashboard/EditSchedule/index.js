/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import useAnimation from '../../../hooks/useAnimation';

import Time from '../../../utils/Time';

import { getColorStyle, getLength, getLines, isHead, isHeadAlone, getBodyIds } from '../../../utils/Cell';
import { destructure } from '../../../utils/Utils';
import { sameDay } from '../../../utils/Calendar';
import { config } from '../../../features/modals/editSlice';

const EditSchedule = (props) => {
  const dispatch = useDispatch();

  const elements = useAnimation(props.days);

  const handleEditEvent = (e, event, ids) => {
    e.preventDefault();
    e.stopPropagation();

    const payload = {
      ids: ids,
      title: event.label,
      description: event.description,
      obligatory: event.obligatory,
      link: event.link,
    };

    dispatch(config(payload));
  };

  const getDayEvents = (dayEvents, day) => {
    return new Array(9).fill(0).reduce((acc, curr, i) => {
      const condition = (event) => parseInt(event.start.hours) === i + 8;

      const event = dayEvents.find(condition);

      if (event) return [...acc, event];
      else return [...acc, { id: uuidv4(), start: new Time(i + 8, 0), startDay: day, empty: true }];
    }, []);
  };

  const getEventElement = (eventsArray, i) => {
    const [prev, curr, next] = destructure(eventsArray, i);

    const dayIndex = props.days.findIndex((day) => sameDay(day, curr.startDay));

    const column = 2 * dayIndex + 1;
    const row = curr.start.hours - 8 + 1;

    const classes = `col-start-${column} row-start-${row}`;

    const emptyCell = () => <div className={`${classes}`} key={uuidv4()}></div>;

    const cell = (bodyIds) => (
      <div className={`flex ${classes} ${bodyIds ? `row-end-${row + bodyIds.length}` : ''}`} key={uuidv4()}>
        <div
          ref={(div) => (elements[i] = div)}
          className={`event cursor-pointer ${getColorStyle(curr.color)}`}
          onClick={(e) => handleEditEvent(e, curr, bodyIds || [curr.id])}
        >
          <h3 className='text-normal font-bold'>{curr.subject}</h3>
          <p className='text-normal'>{curr.start.toString}</p>
        </div>
      </div>
    );

    if (isHeadAlone(prev, curr, next)) return cell();
    if (isHead(prev, curr)) return cell(getBodyIds(eventsArray, curr));
    if (curr.empty) return emptyCell();
  };

  const dayMapper = (day) => {
    const condition = ({ startDay }) => sameDay(startDay, day);
    const dayEvents = getDayEvents(props.events.filter(condition), day);
    return dayEvents.map((_, i) => getEventElement(dayEvents, i));
  };

  return (
    <div className='schedule'>
      {props.days.map(dayMapper)}
      {getLines()}
    </div>
  );
};

EditSchedule.propTypes = {
  days: PropTypes.array,
  events: PropTypes.array,
};

export default EditSchedule;
