import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import Time from '../../../../../utils/Time';
import { getWeekDay, getMonth } from '../../../../../utils/Calendar';

import ModalContext from '../../../../../context/modal-context';
import DatabaseContext from '../../../../../context/database-context';
import SelectedEventsContext from '../../../../../context/selected-events-context';

// import './index.scss';

// TODO : [-] Refactor getEventElement function (try grouping events into one element).
// TODO : [ ] Handle event click.
// TODO : [ ] Get more infos when fetching events.

const Day = (props) => {
  const dayId = props.index;

  const modalContext = useContext(ModalContext);
  const databaseContext = useContext(DatabaseContext);

  const { selectedEvents, addEvent, removeEvent } = useContext(SelectedEventsContext);

  const nineArray = new Array(9).fill(0);

  const [events] = useState(
    nineArray.reduce((acc, curr, i) => {
      const event = props.infos.events.find((event) => parseInt(event.start.hours) === i + 8);
      if (event) return [...acc, event];
      else return [...acc, { id: uuidv4(), start: new Time(i + 8, 0), empty: true }];
    }, [])
  );

  const selectEvent = (_event, event) => {
    if (dayId in selectedEvents && event.id in selectedEvents[dayId]) removeEvent(event.id, dayId);
    else addEvent(event, dayId);
  };

  const handleEventClick = (_event, event) => {
    // TODO : [ ] Handle click event.

    modalContext.config({
      title: databaseContext.label ? event.subject : event.label,
      link: event.link,
      description: event.description,
      start: event.start.toString,
      pin: event.obligatory ? 'Obligatoire' : '',
      pinColor: 'red',
      subjectOwner: event.owner,
    });
  };

  const getEventElement = (eventsArray, i) => {
    const prev = eventsArray[i - 1];
    const curr = eventsArray[i];
    const next = eventsArray[i + 1];

    const isOneSelected = dayId in selectedEvents && selectedEvents[dayId].size > 0;

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
        {content && <h3 className='title'>{databaseContext.label ? curr.subject : curr.label}</h3>}
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
