import { validators } from 'com';
import context from './context';
const { validateId } = validators;

const toggleLikePost = (postId) => {
  validateId(postId, 'post id');

  return fetch(`${import.meta.env.VITE_API_URL}/posts/like/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${context.token}`,
    },
  }).then((res) => {
    if (res.status !== 204)
      return res.json().then(({ error: message }) => {
        throw new Error(message);
      });
  });
};

export default toggleLikePost;
