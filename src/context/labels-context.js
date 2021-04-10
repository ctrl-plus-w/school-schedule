import { createContext } from 'react';

const LabelsContext = createContext({
  labels: '',
});

export const LabelsProvider = LabelsContext.Provider;
export const LabelsConsumer = LabelsContext.Consumer;
export default LabelsContext;
