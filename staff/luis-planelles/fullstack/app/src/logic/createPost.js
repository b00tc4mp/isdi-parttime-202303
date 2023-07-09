import { validators } from 'com';
const { validateToken, validateUrl, validateText } = validators;

const createPost = (token, image, text) => {
  validateToken(token, 'token');
  validateUrl(image, 'image');
  validateText(text, 'text');

  return fetch(`${import.meta.env.VITE_API_URL}/users/posts`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ image, text }),
  }).then((res) => {
    if (res.status !== 201) {
      return res.json().then(({ error: message }) => {
        throw new Error(message);
      });
    }
  });
};

export default createPost;
