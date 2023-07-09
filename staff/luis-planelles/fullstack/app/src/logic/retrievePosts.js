import { validators } from 'com';

const { validateToken } = validators;

const retrievePosts = (token) => {
  validateToken(token, 'token');

  return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status !== 200)
      return res.json().then(({ error: message }) => {
        throw new Error(message);
      });
    return res.json();
  });
};

export default retrievePosts;
