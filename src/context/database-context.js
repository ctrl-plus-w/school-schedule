import { createContext } from 'react';

const DatabaseContext = createContext({
  events: [],
  labels: [],

  setEvents: () => {},
  setLabels: () => {},
});

export const DatabaseProvider = DatabaseContext.Provider;
export const DatabaseConsumer = DatabaseContext.Consumer;
export default DatabaseContext;
