import { createContext } from 'react';

const SelectedEventsContext = createContext({
  events: {},

  addEvent: () => {},
  removeEvent: () => {},
});

export default SelectedEventsContext;
