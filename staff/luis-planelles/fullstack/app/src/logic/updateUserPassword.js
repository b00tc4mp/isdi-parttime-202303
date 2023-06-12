import { validators } from 'com';
const { validateId, validatePassword, validateCallback } = validators;

const updateUserPassword = (
  userId,
  password,
  newPassword,
  newPasswordConfirm,
  callback
) => {
  validateId(userId, 'user id');
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

  xhr.open(
    'PATCH',
    `${import.meta.env.VITE_API_URL}/users/updatePassword/${userId}`
  );

  xhr.setRequestHeader('Content-Type', 'application/json');

  const data = {
      password: password,
      newPassword: newPassword,
      newPasswordConfirm: newPasswordConfirm,
    },
    json = JSON.stringify(data);

  xhr.send(json);
};

export default updateUserPassword;
