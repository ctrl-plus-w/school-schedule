import { createContext } from 'react';

const ErrorsContext = createContext({
  errors: [],

  addError: () => {},
  removeError: () => {},
});

export default ErrorsContext;
export const ErrorsProvider = ErrorsContext.Provider;
export const ErrorsConsumer = ErrorsContext.Consumer;
