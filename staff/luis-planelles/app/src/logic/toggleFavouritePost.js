import { saveUser } from '../data';
import { findPostById, findUserById } from './helpers/data-managers';
import { validateId } from './helpers/validators';

const toggleFavouritePost = (postId, userId) => {
  validateId(postId, 'post id');
  validateId(postId, 'user id');

  const foundUser = findUserById(userId);
  if (!foundUser) throw new Error(`user: ${userId} not found`);

  const foundPost = findPostById(postId);
  if (!foundPost) throw new Error(`post: ${postId} not found`);

  if (!foundUser.info.favourites) {
    foundUser.info.favourites = [postId];
  } else {
    const postIndex = foundUser.info.favourites.indexOf(postId);

    if (postIndex < 0) {
      foundUser.info.favourites.push(postId);
    } else {
      foundUser.info.favourites.splice(postIndex, 1);
    }
  }

  if (!foundUser.info.favourites.length) {
    delete foundUser.info.favourites;
  }

  saveUser(foundUser);

  return foundUser;
};

export default toggleFavouritePost;
