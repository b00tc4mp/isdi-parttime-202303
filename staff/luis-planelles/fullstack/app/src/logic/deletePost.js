import { validators } from 'com';
const { validateToken, validateId, validateCallback } = validators;

const deletePost = (token, postId, callback) => {
  validateToken(userId, 'token');
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
  xhr.setRequestHeader('Authorization', `Bearer ${token}`);

  const post = { postId },
    json = JSON.stringify(post);

  xhr.send(json);
};

export default deletePost;
