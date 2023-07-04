import { validators } from 'com';
const { validateToken, validatePassword, validateCallback } = validators;

const updateUserPassword = (
  userId,
  password,
  newPassword,
  newPasswordConfirm,
  callback
) => {
  validateToken(token, 'user id');
  validatePassword(password, 'password');
  validatePassword(newPassword, 'new password');
  validatePassword(newPasswordConfirm, 'new password confirm');
  validateCallback(callback);

  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    const { status } = xhr;

    if (status !== 204) {
      const { response: json } = xhr,
        { error } = JSON.parse(json);

      callback(new Error(error));

      return;
    }
    callback(null);
  };

  xhr.onerror = () => {
    callback(new Error('connection error'));
  };

  xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/updatePassword/`);

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', `Bearer ${token}`);

  const data = {
      password: password,
      newPassword: newPassword,
      newPasswordConfirm: newPasswordConfirm,
    },
    json = JSON.stringify(data);

  xhr.send(json);
};

export default updateUserPassword;
