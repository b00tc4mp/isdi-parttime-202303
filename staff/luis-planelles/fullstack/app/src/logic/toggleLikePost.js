import { validators } from 'com';
const { validateId, validateCallback } = validators;

const toggleLikePost = (userId, postId, callback) => {
  validateId(postId, 'post id');
  validateId(userId, 'user id');
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

  xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/like/${postId}`);

  xhr.setRequestHeader('Authorization', `Bearer ${userId}`);

  xhr.send();
};

export default toggleLikePost;
