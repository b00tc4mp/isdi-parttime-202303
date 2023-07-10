import { validators } from 'com';
const { validateToken, validateId } = validators;

const deletePost = (token, postId) => {
  validateToken(token, 'token');
  validateId(postId, 'post id');

  return fetch(`${import.meta.env.VITE_API_URL}/posts/delete/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status !== 204) {
      return res.json().then(({ error: message }) => {
        throw new Error(message);
      });
    }
  });
};
export default deletePost;
