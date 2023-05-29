import { findPostById, findUserById } from './helpers/data-managers.js';
import { validateCallback, validateId } from './helpers/validators.js';

const retrievePost = (userId, postId, callback) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');
  validateCallback(callback);

  findUserById(userId, (user) => {
    if (!user) {
      callback(new Error(`user with id ${userId} not exist`));

      return;
    }

    findPostById(postId, (post) => {
      if (!post) {
        callback(new Error(`post with id ${postId} not exist`));

        return;
      }

      callback(null, post);
    });
  });
};

export default retrievePost;
