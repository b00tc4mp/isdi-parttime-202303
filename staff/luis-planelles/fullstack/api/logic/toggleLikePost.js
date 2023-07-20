const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

const { User, Post } = require('../data/models');

/**
 * Toggles the like status of a post for a user.
 * @param {string} userId - The ID of the user toggling the like.
 * @param {string} postId - The ID of the post to toggle the like.
 * @returns {Promise<object>} - A promise that resolves to the result of the update operation.
 * @throws {ExistenceError} - If the user with the provided ID or the post with the provided ID does not exist.
 * @throws {TypeError} - on userId or postId wrong type.
 * @throws {ContentError} - on userId or postId wrong characters.
 */

const toggleLikePost = (userId, postId) => {
  validateId(userId, ' user id');
  validateId(postId, ' post id');

  return (async () => {
    const [foundUser, foundPost] = await Promise.all([
      User.findById(userId),
      Post.findById(postId),
    ]);

    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exists`);
    if (!foundPost)
      throw new ExistenceError(`post with id ${postId} not exists`);

    const index = foundPost.likes.indexOf(userId);

    if (index < 0) {
      foundPost.likes.push(userId);
    } else {
      foundPost.likes.splice(index, 1);
    }
    await Post.updateOne({ _id: postId }, { $set: { likes: foundPost.likes } });
  })();
};

module.exports = toggleLikePost;
