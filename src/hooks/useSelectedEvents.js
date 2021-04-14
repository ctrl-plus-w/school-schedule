import { useState } from 'react';

const useSelectedEvents = () => {
  const [selectedEvents, setSelectedEvents] = useState({});

  const addEvent = (event, dayId) => {
    setSelectedEvents((prev) => ({ ...prev, [dayId]: { ...prev[dayId], [event.id]: event } }));
    console.log(selectedEvents);
  };

  const removeEvent = (eventId, dayId) => {
    // eslint-disable-next-line no-unused-vars
    setSelectedEvents(({ [dayId]: { [eventId]: _, ...eventsRest }, ...daysRest }) => ({ ...daysRest, [dayId]: { ...eventsRest } }));
    console.log(selectedEvents);
  };

  return {
    selectedEvents,

    addEvent,
    removeEvent,
  };
};

export default useSelectedEvents;
