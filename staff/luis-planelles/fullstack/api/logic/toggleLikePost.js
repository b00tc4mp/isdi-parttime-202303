const { ObjectId } = require('mongodb');

const context = require('./context');
const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

/**
 * Toggles the like status of a post for a user.
 * @param {string} userId - The ID of the user toggling the like.
 * @param {string} postId - The ID of the post to toggle the like.
 * @returns {Promise<object>} - A promise that resolves to the result of the update operation.
 * @throws {ExistenceError} - If the user with the provided ID or the post with the provided ID does not exist.
 */

const toggleLikePost = (userId, postId) => {
  validateId(userId, ' user id');
  validateId(postId, ' post id');

  const { users, posts } = context;

  return users.findOne({ _id: new ObjectId(userId) }).then((foundUser) => {
    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exists`);

    return posts.findOne({ _id: new ObjectId(postId) }).then((foundPost) => {
      if (!foundPost)
        throw new ExistenceError(`post with id ${postId} not exists`);

      const index = foundPost.likes.indexOf(userId);

      if (index < 0) {
        foundPost.likes.push(userId);
      } else {
        foundPost.likes.splice(index, 1);
      }
      return posts.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { likes: foundPost.likes } }
      );
    });
  });
};

module.exports = toggleLikePost;
