import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Time from '../../../utils/Time';

import ROLES from '../../../static/roles';

import { getColorStyle, getLength, getLines, isHead, isHeadAlone } from '../../../utils/Cell';
import { destructure } from '../../../utils/Utils';
import { sameDay } from '../../../utils/Calendar';

import { config, hide } from '../../../features/modals/tooltipSlice';

import { selectRole } from '../../../features/database/authSlice';
import useAnimation from '../../../hooks/useAnimation';

const Schedule = (props) => {
  const dispatch = useDispatch();
  const role = useSelector(selectRole);
  const isStudent = role === ROLES.STUDENT;

  useAnimation(props.events);

  const handleMouseEnter = (event) => {
    const payload = {
      title: event.subject,
      description: event.description || 'Aucune description.',

      fieldName: isStudent ? 'Professeur' : 'Groupe',
      fieldContent: isStudent ? event.owner.name : event.label,

      obligatory: event.obligatory,
    };

    dispatch(config(payload));
  };

  const handleMouseLeave = () => {
    dispatch(hide());
  };

  const handleClick = (event) => {
    if (event.link) window.open(event.link, '_blank');
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

    const cell = (length) => (
      <div
        className={`flex ${classes} ${length ? `row-end-${row + length + 1}` : ''} ${curr.link ? 'cursor-pointer' : 'cursor-default'}`}
        key={uuidv4()}
        onMouseEnter={() => handleMouseEnter(curr)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(curr)}
      >
        <div className={`event ${getColorStyle(curr.color)}`}>
          <h3 className='text-normal font-bold'>{isStudent ? curr.subject : curr.label}</h3>
          <p className='text-normal'>{curr.start.toString}</p>
        </div>
      </div>
    );

    if (isHeadAlone(prev, curr, next)) return cell();
    if (isHead(prev, curr)) return cell(getLength(eventsArray, curr));
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

Schedule.propTypes = {
  days: PropTypes.array,
  events: PropTypes.array,
};

export default Schedule;
