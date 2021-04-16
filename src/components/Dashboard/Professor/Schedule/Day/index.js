import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Time from '../../../../../utils/Time';
import { getWeekDay, getMonth } from '../../../../../utils/Calendar';

import { config } from '../../../../../features/modals/eventSlice';
import { selectLabel } from '../../../../../features/infos/infosSlice';

// TODO : [-] Refactor getEventElement function (try grouping events into one element).
// TODO : [ ] Handle event click.
// TODO : [ ] Get more infos when fetching events.

const Day = (props) => {
  const dispatch = useDispatch();
  const dayId = props.index;

  const label = useSelector(selectLabel);

  const selectedEvents = {};

  const events = new Array(9).fill(0).reduce((acc, curr, i) => {
    const event = props.infos.events.find((event) => parseInt(event.start.hours) === i + 8);
    return event ? [...acc, event] : [...acc, { id: `${dayId}#start${i + 8}`, start: new Time(i + 8, 0), empty: true }];
  }, []);

  const selectEvent = (_event, event) => {
    event;
    // ! TODO
  };

  const handleEventClick = (_event, event) => {
    const payload = {
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

    const isOneSelected = dayId in selectedEvents && Object.keys(selectedEvents[dayId]).length > 0;
    const isSelected = (id) => dayId in selectedEvents && id in selectedEvents[dayId];

    const emptyCell = (type) => (
      <div
        className={`event ${type} empty ${isSelected(curr.id) ? 'selected' : 'unselected'}`}
        key={curr.id}
        onClick={(e) => selectEvent(e, curr)}
      ></div>
    );

    const cell = (type, content = false) => (
      <div className={`event ${type} ${curr.color} ${isOneSelected ? 'blur' : ''}`} key={curr.id} onClick={(e) => handleEventClick(e, curr)}>
        {content && <h3 className='title'>{label !== '' ? curr.subject : curr.label}</h3>}
        {content && <p className='description'>{curr.start.toString}</p>}
      </div>
    );

    if (curr.empty) {
      if (prev && prev.empty && isSelected(prev.id) && next && next.empty && isSelected(next.id)) return emptyCell('middle');
      if (prev && prev.empty && isSelected(prev.id)) return emptyCell('end');
      if (next && next.empty && isSelected(next.id)) return emptyCell('start');
      return emptyCell('normal');
    }

    if (!prev || prev.empty) {
      if (next?.subject === curr?.subject) return cell('start', true);
      return cell('normal', true);
    }

    if ((!next || next.empty) && prev.subject === curr.subject) return cell('end');

    // If next is an event and prev as well.
    if (!next.empty && !prev.empty) {
      if (next.subject === curr.subject && prev.subject === curr.subject && prev.subject === next.subject) return cell('middle');
      if (prev.subject === curr.subject && curr.subject !== next.subject) return cell('end');

      if (prev.subject !== curr.subject && curr.subject === next.subject) return cell('middle', true);
    }

    return cell('end', true);
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
  index: PropTypes.string,
};

export default Day;
