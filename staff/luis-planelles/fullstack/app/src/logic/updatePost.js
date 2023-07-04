import { validators } from 'com';

const {
  validateCallback,
  validateId,
  validateText,
  validateToken,
  validateUrl,
} = validators;

const updatePost = (token, postId, image, text, callback) => {
  validateToken(token, 'token');
  validateId(postId, 'post id');
  validateUrl(image, 'image url');
  validateText(text);
  validateCallback(callback);

  const xhr = XMLHttpRequest();

  const { status } = xhr;

  xhr.onload = () => {
    if (status !== 204) {
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

  xhr.open(
    'PATCH',
    `${import.meta.env.VITE_API_URL}/posts/updatePost/${postId}`
  );

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', `Bearer ${token}`);

  const data = { image, text },
    json = JSON.stringify(data);

  xhr.send(json);
};

export default updatePost;
