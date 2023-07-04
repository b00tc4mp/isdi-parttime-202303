import { validators } from 'com';
const { validateToken, validateId, validateCallback } = validators;

const toggleFavouritePost = (token, postId, callback) => {
  validateToken(token, 'post id');
  validateId(postId, 'user id');
  validateCallback(callback);

  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    const { status } = xhr;

    if (status !== 204) {
      const { response: json } = xhr;
      const { error } = JSON.parse(json);

      callback(new Error(error.message));

      return;
    }
    callback(null);
  };

  xhr.onerror = () => {
    callback(new Error('connection error'));
  };

  xhr.open(
    'PATCH',
    `${import.meta.env.VITE_API_URL}/posts/favourite/${postId}`
  );

  xhr.setRequestHeader('Authorization', `Bearer ${token}`);

  xhr.send();
};

export default toggleFavouritePost;
