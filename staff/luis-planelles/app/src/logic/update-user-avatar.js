import { validateUrl, validateId } from './helpers/validators.js';
import { findUserById } from './helpers/data-managers.js';
import { saveUser } from '../data.js';

const updateUserAvatar = (userId, avatar) => {
  validateUrl(avatar, 'avatar url');
  validateId(userId, 'user id');

  const foundUser = findUserById(userId);

  if (!foundUser) throw new Error('user not found');

  foundUser.info.avatar = avatar;
  saveUser(foundUser);
};

export default updateUserAvatar;
