import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { RefreshCw } from 'react-feather';

import Selector from '../../Selector';

import useDatabase from '../../../hooks/useDatabase';

import { USERS } from '../../../graphql/users';

const Users = () => {
  const { labels, subjects, roles, loading } = useDatabase();

  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedRole, setSelectedRole] = useState('Pick a role.');

  const { data: usersData, loading: usersLoading, error: usersError, refetch } = useQuery(USERS, { notifyOnNetworkStatusChange: true });

  useEffect(() => usersData && setUsers(usersData.users), [usersData]);
  useEffect(() => usersError && console.error(usersError), [usersError]);

  // TODO : [ ] Handle form submit and request.
  // TODO : [ ] Handle error handling.

  const createUser = (e) => {
    e.preventDefault();

    console.log(username);
    console.log(name);
    console.log(password);

    console.log(selectedLabels);
    console.log(selectedSubjects);
    console.log(selectedRole);
  };

  if (usersLoading || loading) {
    return (
      <div className='container center-content'>
        <h1>Loading...</h1>
      </div>
    );
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'Enseignant':
        return 'blue';
      case 'Admin':
        return 'red';
      case 'Élève':
        return 'green';
      default:
        return 'black';
    }
  };

  const handleChange = (e, setter) => {
    const value = e.target.value;
    setter(value);
  };

  return (
    <div className='users'>
      <form className='form create-user' onSubmit={createUser}>
        <h1 className='form-title'>Create user.</h1>

        <div className='form-fields'>
          <div className='form-group'>
            <input type='text' className='form-control' placeholder='Username' value={username} onChange={(e) => handleChange(e, setUsername)} />
            <input type='text' className='form-control' placeholder='Name' value={name} onChange={(e) => handleChange(e, setName)} />
            <input type='text' className='form-control' placeholder='Password' value={password} onChange={(e) => handleChange(e, setPassword)} />
          </div>

          <div className='form-group'>
            <Selector
              items={labels.map((label) => ({ id: label.id, name: label.label_name }))}
              selected={selectedLabels}
              setSelected={setSelectedLabels}
              className='form-control'
              placeholder='Groups'
              many={true}
            />

            <Selector
              items={subjects.map((subject) => ({ id: subject.id, name: subject.subject_name }))}
              selected={selectedSubjects}
              setSelected={setSelectedSubjects}
              className='form-control'
              placeholder='Subjects'
              many={true}
            />

            <Selector
              items={roles.map((role) => ({ id: role.id, name: role.role_name }))}
              selected={selectedRole}
              setSelected={setSelectedRole}
              className='form-control'
              placeholder=''
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='form-submit'>
              Create user.
            </button>
          </div>
        </div>
      </form>

      <div className='table-title'>
        <h1>Users.</h1>
        <RefreshCw size={24} onClick={() => refetch()} />
      </div>

      <table className='users-data'>
        <thead className='users-data-header'>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Role</th>
            <th>ID</th>
          </tr>
        </thead>

        <tbody className='users-data-content'>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.full_name}</td>
              <td>
                <p className={`pin ${getRoleColor(user.role.role_name)}`}>{user.role.role_name}</p>
              </td>
              <td>{user.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
