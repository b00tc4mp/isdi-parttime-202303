const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

const { User, Post } = require('../data/models');

/**
 * Retrieves a post by its ID, belonging to a specific user.
 * @param {string} userId - The ID of the user who owns the post.
 * @param {string} postId - The ID of the post to retrieve.
 * @returns {Promise<object>} - A promise that resolves to the retrieved post object.
 * @throws {ExistenceError} - If the user with the provided ID or the post with the provided ID does not exist.
 * @throws {TypeError} - on userId or postId wrong type.
 * @throws {ContentError} - on userId or postId wrong characters.
 */

const retrievePost = (userId, postId) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');

  return User.findById(userId).then((foundUser) => {
    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exists`);

    return Post.findById(postId).then((foundPost) => {
      if (!foundPost)
        throw new ExistenceError(`post with id ${postId} not exists`);

      return foundPost;
    });
  });
};

module.exports = retrievePost;
