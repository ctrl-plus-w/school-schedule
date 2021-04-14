import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Day from '../Day';

import SelectedEventsContext from '../../../../../context/selected-events-context';

import useHorizontalScroll from '../../../../../hooks/useHorizontalScroll';

// TODO : [ ] Add drag to go through days.
// TODO : [ ] Refactor and create context / hooks.
// TODO : [ ] Set bodyHeight to 0 when modals shows.

const Days = (props) => {
  const { container, slider } = useHorizontalScroll();

  const [selectedEvents, setSelectedEvents] = useState({});

  const addEvent = (event, dayId) => {
    setSelectedEvents((prev) => ({ ...prev, [dayId]: { ...prev[dayId], [event.id]: event } }));
  };

  const removeEvent = (eventId, dayId) => {
    console.log(eventId, dayId);
    // eslint-disable-next-line no-unused-vars
    setSelectedEvents(({ [dayId]: { [eventId]: _, ...eventsRest }, ...daysRest }) => ({ ...daysRest, [dayId]: { ...eventsRest } }));
  };

  return (
    <SelectedEventsContext.Provider value={{ selectedEvents, addEvent, removeEvent }}>
      <div className='days' ref={container}>
        <div className='slider' ref={slider}>
          {props.days.map((day, index) => {
            return <Day infos={day} index={`day${index}`} key={day.id} />;
          })}
        </div>
      </div>
    </SelectedEventsContext.Provider>
  );
};

Days.propTypes = {
  days: PropTypes.array,
};

export default Days;
