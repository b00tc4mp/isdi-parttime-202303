import { validators } from 'com';
import context from './context';
const { validateUrl } = validators;

const updateUserAvatar = (url) => {
  validateUrl(url, 'url');

  return fetch(`${import.meta.env.VITE_API_URL}/users/updateAvatar`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${context.token}`,
    },
    body: JSON.stringify({ avatar: url }),
  }).then((res) => {
    if (res.status !== 204)
      return res.json().then(({ error: message }) => {
        throw new Error(message);
      });
  });
};

export default updateUserAvatar;
