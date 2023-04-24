import { saveUser } from '../data.js';
import { findUserById } from './helpers/data-managers.js';
import { validateId, validateUrl } from './helpers/validators.js';

const updateUserAvatar = (userId, avatar) => {
  validateUrl(avatar, 'avatar url');
  validateId(userId, 'user id');

  const foundUser = findUserById(userId);

  if (!foundUser) throw new Error('user not found');

  foundUser.info.avatar = avatar;
  saveUser(foundUser);
};

export default updateUserAvatar;
