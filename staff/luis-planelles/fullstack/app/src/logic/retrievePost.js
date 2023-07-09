import { validators } from 'com';

const { validateToken, validateId } = validators;

const retrievePost = (token, postId) => {
  validateToken(token, 'token');
  validateId(postId, 'post id');

  return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
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

export default retrievePost;
