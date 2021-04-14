import { useState } from 'react';

import { v4 } from 'uuid';

const useError = () => {
  const [errors, setErrors] = useState({
    [v4()]: {
      title: 'Error',
      message: 'Something wrong happend.',
    },
  });

  // eslint-disable-next-line no-unused-vars
  const removeKey = (key, { [key]: _, ...rest }) => rest;

  const addError = (title, message) => {
    const error = { title, message };
    setErrors((prev) => ({
      ...prev,
      error,
    }));
  };

  const removeError = (id) => {
    setErrors((prev) => removeKey(id, prev));
  };

  return {
    errors,

    addError,
    removeError,
  };
};

export default useError;
