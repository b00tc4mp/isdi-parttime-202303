import { validators } from 'com';
const { validateId, validateUrl, validateText, validateCallback } = validators;

const createPost = (userId, image, text, callback) => {
  validateId(userId, 'user id');
  validateUrl(image, 'image');
  validateText(text, 'text');
  validateCallback(callback);

  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    const { status } = xhr;

    if (status !== 201) {
      const { response: json } = xhr,
        { error } = JSON.parse(json);

      callback(new Error(error));

      return;
    }

    callback(null);
  };

  xhr.onerror = () => {
    callback(new Error('connection error'));
  };

  xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/post`);

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', `Bearer ${userId}`);

  const post = { image, text },
    json = JSON.stringify(post);

  xhr.send(json);
};

export default createPost;
