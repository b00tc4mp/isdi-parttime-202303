import { validators } from 'com';
const { validateToken, validatePassword } = validators;

const updateUserPassword = (
  token,
  password,
  newPassword,
  newPasswordConfirm
) => {
  validateToken(token, 'user id');
  validatePassword(password, 'password');
  validatePassword(newPassword, 'new password');
  validatePassword(newPasswordConfirm, 'new password confirm');

  return fetch(`${import.meta.env.VITE_API_URL}/users/updatePassword/`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
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
