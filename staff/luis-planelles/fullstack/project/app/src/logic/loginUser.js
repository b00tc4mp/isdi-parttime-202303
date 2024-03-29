import { validators } from 'com';
import context from './context';
const { validateEmail, validatePassword } = validators;

const loginUser = (email, password) => {
  validateEmail(email);
  validatePassword(password, 'password');

  return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.status !== 200)
        return res.json().then((error) => {
          throw new Error(error.message);
        });

      return res.json();
    })
    .then((token) => {
      context.token = token;
    });
};

export default loginUser;
