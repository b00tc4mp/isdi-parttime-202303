import { validators } from 'com';
const { validateId, validateCallback } = validators;

const deletePost = (userId, postId, callback) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');
  validateCallback(callback);

  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    const { status } = xhr;

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

  xhr.open('DELETE', `${import.meta.env.VITE_API_URL}/posts/${postId}`);

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', `Bearer ${userId}`);

  const post = { postId },
    json = JSON.stringify(post);

  xhr.send(json);
};

export default deletePost;