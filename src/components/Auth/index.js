import PropTypes from 'prop-types';
import React, { useState, useContext, createRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'react-feather';

import AuthContext from '../../context/auth-context';
import { useMutation } from '@apollo/client';

import { LOGIN } from '../../graphql/auth';

import './index.scss';

const Auth = (props) => {
  const defaultFocusField = createRef();

  const [errorMessage, setErrorMessage] = useState('');

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [passwordHidden, setPasswordHidden] = useState(true);

  const authContext = useContext(AuthContext);

  const [login] = useMutation(LOGIN, {
    variables: {
      username: usernameInput,
      password: passwordInput,
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
    onCompleted: async (data) => {
      if (!data) return setErrorMessage('Un problème est servenue.');
      authContext.login(data.login.token, data.login.token_expiration, data.login.id, data.login.role, data.login.full_name);
      props.history.push('/dashboard');

      // TODO : [ ] Redirect.
      // TODO : [ ] Save token and more in the local storage or session.
    },
  });

  useEffect(() => {
    defaultFocusField && defaultFocusField.current.focus();
  }, [defaultFocusField]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if fields are empty.
    if (usernameInput === '' || passwordInput === '') return setErrorMessage('Vous devez remplir tout les champs.');

    // Reset error message and fetch the login data.
    setErrorMessage('');
    login();
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
          {passwordHidden ? (
            <EyeOff size={18} className='icon' onClick={handleIconSwitch} />
          ) : (
            <Eye size={18} className='icon' onClick={handleIconSwitch} />
          )}
        </label>

        <button type='submit' className='submit-button'>
          Connection
        </button>

        <p className='error' style={{ opacity: errorMessage ? 1 : 0 }}>
          {errorMessage}
        </p>
      </form>
    </div>
  );
};

Auth.propTypes = {
  history: PropTypes.any,
};

export default Auth;
