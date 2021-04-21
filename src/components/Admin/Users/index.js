import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers, selectUsers, isLoading } from '../../../features/database/usersSlice';

import Table from '../Table';

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchUsers()), []);

  const loading = useSelector(isLoading);
  const users = useSelector(selectUsers);

  const usersMapper = (user) => ({
    id: user.id,
    name: user.full_name,
    username: user.username,
    role: user.role.role_name,
    labels: user.labels.map((l) => l.label_name),
    subjects: user.subjects.map((s) => s.subject_name),
  });

  const fields = [
    {
      name: 'ID',
      field: 'id',
    },
    {
      name: 'Username',
      field: 'username',
    },
    {
      name: 'Name',
      field: 'name',
    },
    {
      name: 'Role',
      field: 'role',
      badge: {
        Élève: 'green',
        Enseignant: 'blue',
        Admin: 'red',
      },
    },
    {
      name: 'Subjects',
      field: 'subjects',
    },
    {
      name: 'Labels',
      field: 'labels',
    },
  ];

  return (
    <div className='category-container'>
      <header className='header'>
        <h1>Users</h1>
      </header>

      {loading || users.length === 0 ? <h1>Loading</h1> : <Table fields={fields} items={users.map(usersMapper)} />}
    </div>
  );
};

export default Users;
