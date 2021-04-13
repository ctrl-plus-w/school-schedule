import { useState } from 'react';

const useAuth = () => {
  const ROLES = {
    PROFESSOR: 'Enseignant',
    STUDENT: 'Élève',
    ADMIN: 'Admin',
  };

  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState({});

  const login = (token, _tokenExpiration, userId, role, fullName) => {
    setToken(token);
    setUserId(userId);
    setFullName(fullName);
    setRole(role);

    if (role === ROLES.PROFESSOR) return '/dashboard';
    if (role === ROLES.STUDENT) return '/dashboard';
    if (role === ROLES.ADMIN) return '/admin';
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

    isProfessor: role === ROLES.PROFESSOR,
    isStudent: role === ROLES.STUDENT,
    isAdmin: role === ROLES.ADMIN,

    login,
    logout,
  };
};

export default useAuth;
