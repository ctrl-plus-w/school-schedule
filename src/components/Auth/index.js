/* eslint-disable no-unused-vars */
import React, { useState, createRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff } from 'react-feather';
import { Link, useHistory } from 'react-router-dom';

import { login, selectError, selectRole, setError } from '../../features/database/authSlice';

import './index.scss';

// TODO : [x] Handle error messages.

const ROLES_PATHS = {
  Élève: 'schedule',
  Enseignant: 'dashboard',
  admin: 'admin',
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
    <div className='container center-content'>
      <form className='login' onSubmit={handleFormSubmit}>
        <h1 className='title'>Se connecter.</h1>
        <Link to='/missed-password' className='sub-title'>
          Mot de passe oublié ?
        </Link>

        <label htmlFor='username'>
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

        <label htmlFor='password'>
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

          <button type='button' className='icon' onClick={handleIconSwitch}>
            {passwordHidden ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </label>

        <button type='submit' className='submit-button'>
          Connection
        </button>

        <p className='error' style={{ opacity: error ? 1 : 0 }}>
          {error}
        </p>
      </form>
    </div>
  );
};

export default Auth;
