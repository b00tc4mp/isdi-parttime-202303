import { validators } from 'com';
import context from './context';
const { validateUrl, validateText } = validators;

const createPost = (image, text) => {
  validateUrl(image, 'image');
  validateText(text, 'text');

  return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${context.token}`,
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
