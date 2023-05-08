import { saveUser } from '../data.js';
import { findUserById } from './helpers/data-managers.js';
import { validateId, validateUrl } from './helpers/validators.js';

const updateUserAvatar = (userId, avatar) => {
  validateUrl(avatar, 'updateUserAvatar: avatar url');
  validateId(userId, 'updateUserAvatar: user id');

  const foundUser = findUserById(userId);

  if (!foundUser) throw new Error('user not found');

  foundUser.info.avatar = avatar;
  saveUser(foundUser);
};

export default updateUserAvatar;
