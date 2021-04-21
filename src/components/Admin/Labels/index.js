import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLabels, selectLabels, isLoading } from '../../../features/database/labelsSlice';

import Table from '../Table';

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchLabels()), []);

  const loading = useSelector(isLoading);
  const labels = useSelector(selectLabels);

  const labelsMapper = (label) => ({
    id: label.id,
    name: label.label_name,
  });

  const fields = [
    {
      name: 'ID',
      field: 'id',
    },
    {
      name: 'Name',
      field: 'name',
    },
  ];

  return (
    <div className='category-container'>
      <header className='header'>
        <h1>Labels</h1>
      </header>

      {loading || labels.length === 0 ? <h1>Loading</h1> : <Table fields={fields} items={labels.map(labelsMapper)} />}
    </div>
  );
};

export default Users;
