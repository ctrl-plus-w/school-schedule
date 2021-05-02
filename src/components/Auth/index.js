import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Eye, EyeOff, Loader } from 'react-feather';
import { Link, useHistory } from 'react-router-dom';

import { login, selectError, selectRole, setError } from '../../features/database/authSlice';

import Input from '../Input';
import Button from '../Button';

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

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [passwordHidden, setPasswordHidden] = useState(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = (str) => str.trim() === '';

    if (isEmpty(username) || isEmpty(password)) {
      await dispatch(setError('Vous devez remplir tout les champs.'));
    } else {
      setLoading(true);
      await dispatch(login({ username: username, password: password }));
    }
    setLoading(false);
  };

  const handleIconSwitch = (e) => {
    e.preventDefault();
    setPasswordHidden(!passwordHidden);
  };

  const passwordInputType = passwordHidden ? 'password' : 'text';
  const passwordInputIcon = passwordHidden ? <EyeOff size={18} /> : <Eye size={18} />;

  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <form className='flex flex-col items-start w-1/4 min-w-large p-16' onSubmit={handleFormSubmit}>
        <h1 className='text-3xl font-bold text-black'>Connection</h1>

        <Link to='/missed-password' className='block text-base font-normal text-blue-600 link-animation'>
          Mot de passe oublié ?
        </Link>

        <Input className='mt-4 w-full' type='text' value={username} onChange={setUsername} placeholder="Nom d'utilisateur" />

        <Input
          className='mt-2 w-full'
          type={passwordInputType}
          value={password}
          onChange={setPassword}
          placeholder='Mot de passe'
          icon={passwordInputIcon}
          onClick={handleIconSwitch}
        />

        <Button type='submit' className='mt-4'>
          Se connecter
          {loading ? <Loader size={22} className='ml-2 animate-spin' /> : <Check size={22} className='ml-2' />}
        </Button>

        <p className='error mt-8' style={{ opacity: error ? 1 : 0 }}>
          {error}
        </p>
      </form>
    </div>
  );
};

export default Auth;
