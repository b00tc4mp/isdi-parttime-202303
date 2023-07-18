import { validators } from 'com';
import context from './context';
const { validateId } = validators;

const retrievePost = (postId) => {
  validateId(postId, 'post id');

  return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${context.token}`,
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
