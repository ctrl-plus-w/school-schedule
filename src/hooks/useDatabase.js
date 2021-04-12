import { useState, useEffect } from 'react';

import { useQuery } from '@apollo/client';

import { EVENTS } from '../graphql/events';
import { LABELS } from '../graphql/labels';

const useDatabase = () => {
  const [events, setEvents] = useState([]);
  const [labels, setLabels] = useState([]);

  const { data: eventsData, error: eventsError, loading: eventsLoading } = useQuery(EVENTS);
  const { data: labelsData, error: labelsError, loading: labelsLoading } = useQuery(LABELS);

  useEffect(() => {
    // TODO : [ ] Handle errors.
    if (eventsError || labelsError) {
      console.error('EventsError :', eventsError);
      console.error('LabelsError :', labelsError);
    }
  }, [eventsError, labelsError]);

  // TODO : [ ] Sort labels by name.
  useEffect(() => {
    if (eventsData) setEvents(eventsData.userEvents);
    if (labelsData) setLabels(labelsData.labels);
  }, [eventsData, labelsData]);

  return {
    loading: eventsLoading || labelsLoading,
    events: events,
    labels: labels,

    setEvents: setEvents,
    setLabels: setLabels,
  };
};

export default useDatabase;
