import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff } from 'react-feather';
import { Link, useHistory } from 'react-router-dom';

import { login, selectError, selectRole, setError } from '../../features/database/authSlice';
import Input from '../Input';

// TODO : [x] Handle error messages.

const ROLES_PATHS = {
  Élève: 'schedule',
  Enseignant: 'dashboard',
  Admin: 'admin',
};

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const error = useSelector(selectError);
  const role = useSelector(selectRole);

  useEffect(() => role && history.push(ROLES_PATHS[role]), [role]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [passwordHidden, setPasswordHidden] = useState(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = (str) => str.trim() === '';

    if (isEmpty(username) || isEmpty(password)) dispatch(setError('Vous devez remplir tout les champs.'));
    else dispatch(login({ username: username, password: password }));
  };

  const handleIconSwitch = (e) => {
    e.preventDefault();
    setPasswordHidden(!passwordHidden);
  };

  const passwordInputType = passwordHidden ? 'password' : 'text';
  const passwordInputIcon = passwordHidden ? <EyeOff size={18} /> : <Eye size={18} />;

  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <form className='flex flex-col w-1/4 min-w-large p-16' onSubmit={handleFormSubmit}>
        <h1 className='text-3xl font-bold text-black'>Connection</h1>

        <Link to='/missed-password' className='text-base font-normal text-blue-600'>
          Mot de passe oublié ?
        </Link>

        <Input className='mt-4' type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />

        <Input
          className='mt-2'
          type={passwordInputType}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Mot de passe'
          icon={passwordInputIcon}
          onClick={handleIconSwitch}
        />

        <button type='submit' className='button mt-4'>
          Connection
        </button>

        <p className='error mt-8' style={{ opacity: error ? 1 : 0 }}>
          {error}
        </p>
      </form>
    </div>
  );
};

export default Auth;
