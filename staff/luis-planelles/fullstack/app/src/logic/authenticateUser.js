import { validators } from 'com';
const { validateEmail, validatePassword, validateCallback } = validators;

const authenticateUser = (email, password, callback) => {
  validateEmail(email);
  validatePassword(password, 'password');
  validateCallback(callback);

  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    const { status } = xhr;

    if (status !== 200) {
      const { response: json } = xhr,
        { error } = JSON.parse(json);

      callback(new Error(error));

      return;
    }

    const { response: json } = xhr,
      userId = JSON.parse(json);

    callback(null, userId);
  };

  xhr.onerror = () => {
    callback(new Error('connection error'));
  };

  xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/auth`);

  xhr.setRequestHeader('Content-Type', 'application/json');

  const user = { email, password },
    json = JSON.stringify(user);

  xhr.send(json);
};

export default authenticateUser;
