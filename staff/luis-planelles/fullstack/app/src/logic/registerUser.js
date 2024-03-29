import { validators } from 'com';
const { validateName, validateEmail, validatePassword } = validators;

const registerUser = (name, email, password) => {
  validateName(name);
  validateEmail(email);
  validatePassword(password, 'password');

  return fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    if (res.status !== 201) {
      return res.json().then(({ type, error: message }) => {
        throw new Error[type](message);
      });
    }
  });
};

export default registerUser;
