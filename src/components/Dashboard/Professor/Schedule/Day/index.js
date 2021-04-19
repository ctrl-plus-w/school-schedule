/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Time from '../../../../../utils/Time';
import { getWeekDay, getMonth } from '../../../../../utils/Calendar';

import { config } from '../../../../../features/modals/eventSlice';
import { selectLabel, addEvent, removeEvent, selectEvents } from '../../../../../features/infos/infosSlice';

// TODO : [ ] Optimize.
// TODO : [ ] Block user from creating events in the past. (selection)

const Day = (props) => {
  const dispatch = useDispatch();

  const label = useSelector(selectLabel);
  const selectedEvents = useSelector(selectEvents);

  const events = new Array(9).fill(0).reduce((acc, curr, i) => {
    const event = props.infos.events.find((event) => parseInt(event.start.hours) === i + 8);
    return event ? [...acc, event] : [...acc, { id: uuidv4(), day: props.date, start: new Time(i + 8, 0), empty: true }];
  }, []);

  const handleSelectEvent = (_event, event) => {
    const payload = { date: props.date, start: event.start.toString };

    if (payload.date in selectedEvents && selectedEvents[payload.date].some(({ start }) => start === payload.start)) dispatch(removeEvent(payload));
    else dispatch(addEvent(payload));
  };

  const handleEventClick = (_event, event) => {
    const payload = {
      id: event.id,
      title: event.subject,
      link: event.link,
      description: event.description,
      start: event.start.toString,
      pin: event.obligatory ? 'Obligatoire' : '',
      pinColor: 'red',
      subjectOwner: event.owner,
    };

    dispatch(config(payload));
  };

  const getEventElement = (eventsArray, i) => {
    const prev = eventsArray[i - 1];
    const curr = eventsArray[i];
    const next = eventsArray[i + 1];

    // const isOneSelected = dayId in selectedEvents && Object.keys(selectedEvents[dayId]).length > 0;
    const isSelected = (time) => props.date in selectedEvents && selectedEvents[props.date].some(({ start }) => start === time.toString);

    const emptyCell = (type) => (
      <div
        className={`event ${type} empty ${isSelected(curr.start) ? 'selected' : 'unselected'}`}
        key={curr.id}
        onClick={(e) => handleSelectEvent(e, curr)}
      ></div>
    );

    const cell = (type, content = false) => {
      return (
        <div className={`event ${type} ${curr.color}`} key={curr.id} onClick={(e) => handleEventClick(e, curr)}>
          {content && <h3 className='title'>{label.name ? curr.subject : curr.label}</h3>}
          {content && <p className='description'>{curr.start.toString}</p>}
        </div>
      );
    };

    if (curr.empty) {
      if (prev && prev.empty && isSelected(prev.start) && next && next.empty && isSelected(next.start)) return emptyCell('middle');
      if (prev && prev.empty && isSelected(prev.start)) return emptyCell('end');
      if (next && next.empty && isSelected(next.start)) return emptyCell('start');
      return emptyCell('normal');
    }

    if (!prev || prev.empty) {
      if (next && next.subject === curr.subject && next.label === curr.label) return cell('start', true);
      return cell('normal', true);
    }

    if (!next || next.empty) {
      if (prev.subject !== curr.subject || prev.label !== curr.label) return cell('end', true);
      return cell('end');
    }

    const eq = (pattern, field) => {
      if (pattern === '===') return prev[field] === curr[field] && curr[field] === next[field] && prev[field] === next[field];
      if (pattern === '!==') return prev[field] !== curr[field] && curr[field] === next[field] && prev[field] === next[field];
      if (pattern === '=!=') return prev[field] === curr[field] && curr[field] !== next[field] && prev[field] === next[field];
      if (pattern === '==!') return prev[field] === curr[field] && curr[field] === next[field] && prev[field] !== next[field];
      if (pattern === '!!!') return prev[field] !== curr[field] && curr[field] !== next[field] && prev[field] !== next[field];
      if (pattern === '!!=') return prev[field] !== curr[field] && curr[field] !== next[field] && prev[field] === next[field];
      if (pattern === '=!!') return prev[field] === curr[field] && curr[field] !== next[field] && prev[field] !== next[field];
    };

    // If next is an event and prev as well.
    if (next && !next.empty && prev && !prev.empty) {
      if (eq('===', 'subject') && eq('===', 'label')) return cell('middle');
      if (eq('==!', 'subject') || eq('==!', 'label')) return cell('end');
      if (eq('===', 'subject') && eq('!!=', 'label')) return cell('end', true);

      if (eq('=!!', 'label') || eq('==!', 'subject')) return cell('end');

      if (eq('!', 'label')) return cell('end', true);

      if (prev.subject !== curr.subject && curr.subject === next.subject && prev.label !== curr.label && curr.label === next.label)
        return cell('middle', true);

      return cell('middle', true);
    }
  };

  return (
    <div className='day'>
      <div className='header'>
        <h3 className='title'>
          {getWeekDay(props.infos.date)} {props.infos.date.getDate()} {getMonth(props.infos.date)}
        </h3>
      </div>
      <div className='events professor-events'>{events.map((el, i) => getEventElement(events, i))}</div>
    </div>
  );
};

Day.propTypes = {
  infos: PropTypes.object,
  date: PropTypes.any,
};

export default Day;
