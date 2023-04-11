import { validateUrl } from './helpers/validators.js';
import { findUserById } from './helpers/data-managers.js';

const updateUserAvatar = (userId, avatar) => {
  validateUrl(avatar, 'avatar url');

  const foundUser = findUserById(userId);

  if (!foundUser) throw new Error('user not found');

  foundUser.info.avatar = avatar;
};

export default updateUserAvatar;
