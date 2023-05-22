import { posts, savePosts, saveUser } from '../data.js';
import { findUserById } from './helpers/data-managers.js';
import { validateId, validateUrl } from './helpers/validators.js';

const updateUserPostAvatar = (userId, avatar) => {
  const _posts = posts();

  for (const post of _posts) {
    if (post.author === userId && post.avatar !== avatar) post.avatar = avatar;
  }
  savePosts(_posts);
};

const updateUserAvatar = (userId, avatar) => {
  validateUrl(avatar, 'avatar url');
  validateId(userId, 'user id');

  const foundUser = findUserById(userId);

  if (!foundUser) throw new Error('user not found');

  foundUser.info.avatar = avatar;
  saveUser(foundUser);

  updateUserPostAvatar(userId, avatar);
};

export default updateUserAvatar;
