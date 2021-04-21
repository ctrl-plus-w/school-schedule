import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchRoles, selectRoles, isLoading } from '../../../features/database/rolesSlice';

import Table from '../Table';

const Roles = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchRoles()), []);

  const loading = useSelector(isLoading);
  const roles = useSelector(selectRoles);

  const rolesMapper = (role) => ({
    id: role.id,
    name: role.role_name,
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
        <h1>Roles</h1>
      </header>

      {loading || roles.length === 0 ? <h1>Loading</h1> : <Table fields={fields} items={roles.map(rolesMapper)} />}
    </div>
  );
};

export default Roles;
