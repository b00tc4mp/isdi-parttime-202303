import { validators } from 'com';
const { validateId } = validators;

const toggleLikePost = (token, postId) => {
  validateId(token, 'token');
  validateId(postId, 'post id');

  return fetch(`${import.meta.env.VITE_API_URL}/posts/like/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status !== 204)
      return res.json().then(({ error: message }) => {
        throw new Error(message);
      });
  });
};

export default toggleLikePost;
