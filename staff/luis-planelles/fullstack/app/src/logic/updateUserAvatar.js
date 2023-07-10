import { validators } from 'com';
const { validateToken, validateUrl } = validators;

const updateUserAvatar = (token, url) => {
  validateToken(token, 'token');
  validateUrl(url, 'url');

  return fetch(`${import.meta.env.VITE_API_URL}/users/updateAvatar`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
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
