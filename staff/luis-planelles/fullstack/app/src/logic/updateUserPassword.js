import { validators } from 'com';
import context from './context';
const { validatePassword } = validators;

const updateUserPassword = (password, newPassword, newPasswordConfirm) => {
  validatePassword(password, 'password');
  validatePassword(newPassword, 'new password');
  validatePassword(newPasswordConfirm, 'new password confirm');

  return fetch(`${import.meta.env.VITE_API_URL}/users/updatePassword/`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${context.token}`,
    },
    body: JSON.stringify({ password, newPassword, newPasswordConfirm }),
  }).then((res) => {
    if (res.status !== 204)
      return res.json().then(({ error: message }) => {
        throw new Error(message);
      });
  });
};

export default updateUserPassword;
