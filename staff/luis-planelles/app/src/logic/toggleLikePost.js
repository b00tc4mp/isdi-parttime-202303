import { savePost } from '../data';
import { findPostById, findUserById } from './helpers/data-managers';
import { validateCallback, validateId } from './helpers/validators';

const toggleLikePost = (postId, userId, callback) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');
  validateCallback(callback);

  findUserById(userId, (foundUser) => {
    if (!foundUser) {
      callback(new Error(`user with id ${userId} not found`));

      return;
    }

    findPostById(postId, (foundPost) => {
      if (!foundPost) {
        callback(new Error(`foundPost with id ${postId} not found`));

        return;
      }

      const index = foundPost.likes.indexOf(foundUser.info.name);

      if (index < 0) foundPost.likes.push(foundUser.info.name);
      else foundPost.likes.splice(index, 1);

      savePost(foundPost, () => callback(null));
    });
  });
};

export default toggleLikePost;
