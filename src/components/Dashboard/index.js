import React, { useEffect, useContext, useState } from 'react';

import Topbar from './Topbar';
import Schedule from './Schedule';

import EventsContext from '../../context/events-context';
import { useQuery } from '@apollo/client';

import { EVENTS } from '../../graphql/events';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data, error } = useQuery(EVENTS);

  useEffect(() => {
    if (data) {
      setEvents(data.userEvents);
      setLoading(false);
    }
  }, [data]);

  if (!loading) {
    return (
      <EventsContext.Provider value={events}>
        <div className='container'>
          <Topbar />
          <Schedule />
        </div>
      </EventsContext.Provider>
    );
  } else {
    return (
      <div className='container center-content'>
        <h1>Loading...</h1>
      </div>
    );
  }
};

export default Dashboard;
