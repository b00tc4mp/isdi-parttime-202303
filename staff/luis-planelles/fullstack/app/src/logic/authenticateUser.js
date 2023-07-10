import { validators } from 'com';
const { validateEmail, validatePassword } = validators;

const authenticateUser = (email, password) => {
  validateEmail(email);
  validatePassword(password, 'password');

  return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.status !== 200)
      return res.json().then(({ error: message }) => {
        throw new Error(message);
      });

    return res.json();
  });
};

export default authenticateUser;
