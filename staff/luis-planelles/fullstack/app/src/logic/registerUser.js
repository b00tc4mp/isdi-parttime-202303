import { validators } from 'com';
const { validateName, validateEmail, validatePassword, validateCallback } =
  validators;

const registerUser = (name, email, password, callback) => {
  validateName(name);
  validateEmail(email);
  validatePassword(password);
  validateCallback(callback);

  const xhr = new XMLHttpRequest();

  //xhr.onload = () => {
  xhr.addEventListener('load', () => {
    const { status } = xhr;

    if (status !== 201) {
      const { response: json } = xhr,
        { error } = JSON.parse(json);

      callback(new Error(error));

      return;
    }

    callback(null);
    //};
  });

  //xhr.onerror = () => {
  xhr.addEventListener('error', () => {
    callback(new Error('connection error'));
    //};
  });

  xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/`);

  xhr.setRequestHeader('Content-Type', 'application/json');

  const user = { name, email, password },
    json = JSON.stringify(user);

  xhr.send(json);
};

export default registerUser;
