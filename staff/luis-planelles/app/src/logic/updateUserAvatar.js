import { saveUser } from '../data.js';
import { findUserById } from './helpers/data-managers.js';
import {
  validateCallback,
  validateId,
  validateUrl,
} from './helpers/validators.js';

const updateUserAvatar = (userId, avatar, callback) => {
  validateUrl(avatar, 'avatar url');
  validateId(userId, 'user id');
  validateCallback(callback);

  findUserById(userId, (foundUser) => {
    if (!foundUser) {
      callback(new Error('user not found'));

      return;
    }

    foundUser.info.avatar = avatar;

    saveUser(foundUser, () => callback(null));
  });
};

export default updateUserAvatar;
