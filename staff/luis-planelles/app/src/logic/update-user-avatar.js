import { validateUrl, validateId } from './helpers/validators.js';
import { findUserById } from './helpers/data-managers.js';
import { saveUsers } from '../data.js';

const updateUserAvatar = (userId, avatar) => {
  validateUrl(avatar, 'avatar url');
  validateId(userId);

  const foundUser = findUserById(userId);

  if (!foundUser) throw new Error('user not found');

  foundUser.info.avatar = avatar;
  saveUsers();
};

export default updateUserAvatar;
