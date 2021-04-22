import React from 'react';
import { useSelector } from 'react-redux';

import Table from '../../Table';

import { isLoading, selectLabels } from '../../../../features/database/labelsSlice';

const LabelsList = () => {
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

  return <>{loading || labels.length === 0 ? <h1>Loading</h1> : <Table fields={fields} items={labels.map(labelsMapper)} />}</>;
};

export default LabelsList;
