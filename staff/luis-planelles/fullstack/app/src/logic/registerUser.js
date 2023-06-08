import {
  validateCallback,
  validateEmail,
  validateName,
  validatePassword,
} from './helpers/validators.js';

const registerUser = (name, email, password, callback) => {
  validateName(name);
  validateEmail(email);
  validatePassword(password);
  validateCallback(callback);

  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    const { status } = xhr;

    if (status !== 201) {
      const { response: json } = xhr;
      const { error } = JSON.parse(json);

      callback(new Error(error));

      return;
    }

    callback(null);
  };

  xhr.onerror = () => {
    callback(new Error('connection error'));
  };

  xhr.open('POST', `./data/users`);

  xhr.setRequestHeader('Content-Type', 'application/json');

  const user = { name, email, password };
  const json = JSON.stringify(user);

  xhr.send(json);
};

export default registerUser;
