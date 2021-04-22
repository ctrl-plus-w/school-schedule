import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSubjects, selectSubjects, isLoading } from '../../../features/database/subjectsSlice';

import Table from '../Table';

const Subjects = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchSubjects()), []);

  const loading = useSelector(isLoading);
  const subjects = useSelector(selectSubjects);

  const subjectsMapper = (subject) => ({
    id: subject.id,
    name: subject.subject_name,
    color: subject.color,
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
    {
      name: 'Color',
      field: 'color',
    },
  ];

  return (
    <div className='category-container'>
      <header className='header'>
        <h1>Subjects</h1>
      </header>

      {loading || subjects.length === 0 ? <h1>Loading</h1> : <Table fields={fields} items={subjects.map(subjectsMapper)} />}
    </div>
  );
};

export default Subjects;
