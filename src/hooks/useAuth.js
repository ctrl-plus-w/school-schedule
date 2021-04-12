import { useState } from 'react';

const useAuth = () => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState({});

  const login = (token, _tokenExpiration, userId, role, fullName) => {
    setToken(token);
    setUserId(userId);
    setFullName(fullName);
    setRole(role);
  };

  const logout = () => {
    setToken('');
    setUserId('');
    setRole({});
  };

  return {
    token,
    setToken,

    userId,
    fullName,
    role,

    isProfessor: role === 'Enseignant',
    isStudent: role === 'Élève',

    login,
    logout,
  };
};

export default useAuth;
