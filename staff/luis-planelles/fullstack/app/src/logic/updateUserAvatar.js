import { validators } from 'com';
const { validateId, validateUrl, validateCallback } = validators;

const updateUserAvatar = (userId, avatar, callback) => {
  validateId(userId, 'user id');
  validateUrl(avatar, 'avatar url');
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
    callback(new Error('Connection error'));
  };

  xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/updateAvatar/`);

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', `Bearer ${userId}`);

  const data = { avatar: url },
    json = JSON.stringify(data);

  xhr.send(json);
};

export default updateUserAvatar;
