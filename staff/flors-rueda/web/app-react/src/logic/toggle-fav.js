import { findUserById, saveUser } from '../data/data-managers.js';
import { validatePostExists } from '../data/validators-posts.js';
import { validateUserID } from '../data/validators-users.js';

export const toggleFav = (postId, userId) => {
  validateUserID(userId);
  validatePostExists(postId);
  const user = findUserById(userId);
  const favIndex = user.favs.indexOf(postId);
  if (favIndex === -1) {
    user.favs.push(postId);
  } else {
    user.favs.splice(favIndex, 1);
  }
  saveUser(user);
}