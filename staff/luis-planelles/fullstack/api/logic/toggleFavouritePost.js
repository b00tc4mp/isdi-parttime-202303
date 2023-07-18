const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

const { User, Post } = require('../data/models');

/**
 * Toggles the favorite status of a post for a user.
 * @param {string} userId - The ID of the user toggling the favorite.
 * @param {string} postId - The ID of the post to toggle the favorite.
 * @returns {Promise<object>} - A promise that resolves to the result of the update operation.
 * @throws {ExistenceError} - If the user with the provided ID or the post with the provided ID does not exist.
 * @throws {TypeError} - on userId or postId wrong type.
 * @throws {ContentError} - on userId or postId wrong characters.
 */

const toggleFavouritePost = (userId, postId) => {
  validateId(userId, ' user id');
  validateId(postId, ' post id');

  return User.findById(userId).then((foundUser) => {
    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exists`);

    return Post.findById(postId).then((foundPost) => {
      if (!foundPost)
        throw new ExistenceError(`post with id ${postId} not exists`);

      const index = foundUser.favourites.indexOf(postId);

      if (index < 0) {
        foundUser.favourites.push(postId);
      } else {
        foundUser.favourites.splice(index, 1);
      }

      return User.updateOne(
        { _id: userId },
        { $set: { favourites: foundUser.favourites } }
      ).then(() => {});
    });
  });
};

module.exports = toggleFavouritePost;
