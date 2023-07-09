import { validators } from 'com';

const { validateId, validateText, validateToken, validateUrl } = validators;

const updatePost = (token, postId, image, text) => {
  validateToken(token, 'token');
  validateId(postId, 'post id');
  validateUrl(image, 'image url');
  validateText(text);

  return fetch(`${import.meta.env.VITE_API_URL}/posts/update/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ image, text }),
  }).then((res) => {
    if (res.status !== 204)
      return res.json().then(({ error: message }) => {
        throw new Error(message);
      });
  });
};

export default updatePost;
