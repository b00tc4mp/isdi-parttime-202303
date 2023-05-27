import { saveUser } from '../data';
import { findPostById, findUserById } from './helpers/data-managers';
import { validateCallback, validateId } from './helpers/validators';

const toggleFavouritePost = (postId, userId, callback) => {
  validateId(postId, 'post id');
  validateId(postId, 'user id');
  validateCallback(callback);

  findUserById(userId, (foundUser) => {
    if (!foundUser) {
      callback(new Error(`user: ${userId} not found`));

      return;
    }

    findPostById(postId, (foundPost) => {
      if (!foundPost) {
        callback(new Error(`post with id ${postId} not found`));

        return;
      }

      const index = foundUser.info.favourites.indexOf(postId);

      if (index < 0) foundUser.info.favourites.push(postId);
      else foundUser.info.favourites.splice(index, 1);

      saveUser(foundUser, () => callback(null));
    });
  });
};

export default toggleFavouritePost;
