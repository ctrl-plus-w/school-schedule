import { createContext } from 'react';

const EventsContext = createContext({
  events: [],
});

export const EventsProvider = EventsContext.Provider;
export const EventsConsumer = EventsContext.Consumer;
export default EventsContext;
