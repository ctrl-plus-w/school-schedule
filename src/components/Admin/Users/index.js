/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers, selectUsers, selectLoading } from '../../../features/database/usersSlice';

const MAX_CHAR = 15;

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchUsers()), []);

  const loading = useSelector(selectLoading);
  const users = useSelector(selectUsers);

  const roleColor = (role) => {
    switch (role) {
      case 'Élève':
        return 'green';
      case 'Enseignant':
        return 'blue';
      case 'Admin':
        return 'red';
      default:
        return 'red';
    }
  };

  const concatArray = (values) => {
    const valuesStr = values.join(', ');

    if (values.length <= 1) return valuesStr;
    if (valuesStr.length > MAX_CHAR) return valuesStr.slice(0, MAX_CHAR) + '...';
    return valuesStr;
  };

  const mapLabels = (labels) => {
    const labelsName = labels.map((label) => label.label_name);
    return concatArray(labelsName);
  };

  const mapSubjects = (subjects) => {
    const subjectsName = subjects.map((subject) => subject.subject_name);
    return concatArray(subjectsName);
  };

  const usersMapper = (users) =>
    users.map((user) => (
      <tr key={user.id}>
        <td>{user.id.slice(0, 5)}...</td>

        <td>{user.username}</td>

        <td>{user.full_name}</td>

        <td>
          <span className={`badge ${roleColor(user.role.role_name)}`}>{user.role.role_name}</span>
        </td>

        <td>{mapLabels(user.labels)}</td>

        <td>{mapSubjects(user.subjects)}</td>
      </tr>
    ));

  return (
    <div className='category-container'>
      <header className='header'>
        <h1>Users</h1>
      </header>

      <table className='content'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Labels</th>
            <th>Subjects</th>
          </tr>
        </thead>
        <tbody>{loading ? <h1>Loading</h1> : usersMapper([...users, ...users])}</tbody>
      </table>
    </div>
  );
};

export default Users;
