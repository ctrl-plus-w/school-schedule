import React, { useState, createRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff } from 'react-feather';
import { Link, useHistory } from 'react-router-dom';

import { login, selectError, selectRole, setError } from '../../features/database/authSlice';

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

  const defaultFocusField = createRef();

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [passwordHidden, setPasswordHidden] = useState(true);

  useEffect(() => {
    defaultFocusField && defaultFocusField.current.focus();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = (str) => str.trim() === '';

    if (isEmpty(usernameInput) || isEmpty(passwordInput)) dispatch(setError('Vous devez remplir tout les champs.'));
    else dispatch(login({ username: usernameInput, password: passwordInput }));
  };

  const handleIconSwitch = (e) => {
    e.preventDefault();
    setPasswordHidden(!passwordHidden);
  };

  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <form className='flex flex-col w-1/4 min-w-large p-16' onSubmit={handleFormSubmit}>
        <h1 className='text-3xl font-bold text-black'>Connection</h1>

        <Link to='/missed-password' className='text-base font-normal text-blue-600'>
          Mot de passe oublié ?
        </Link>

        <label className='form-control mt-4' htmlFor='username'>
          <input
            ref={defaultFocusField}
            type='text'
            className='input'
            placeholder="Nom d'utilisateur"
            name='username'
            id='username'
            autoComplete='off'
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        </label>

        <label className='form-control mt-2' htmlFor='password'>
          <button type='button' className='input-icon' onClick={handleIconSwitch}>
            {passwordHidden ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          <input
            type={passwordHidden ? 'password' : 'text'}
            className='input'
            placeholder='Mot de passe'
            name='password'
            id='password'
            autoComplete='off'
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </label>

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
