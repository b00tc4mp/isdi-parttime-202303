import { validators } from 'com';
import context from './context';
const { validateUrl, validateText } = validators;

const createPost = (image, text) => {
  validateUrl(image, 'image');
  validateText(text, 'text');

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
      body: JSON.stringify({ image, text }),
    });

    if (res.status !== 201) {
      const { type, error: message } = await res.json();
      const errorMessage = `${type}: ${message}`;
      throw new Error(errorMessage);
    }
  })();
};

export default createPost;
