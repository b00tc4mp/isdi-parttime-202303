const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

const { User, Post } = require('../data/models');

/**
 * Retrieves all posts and their associated details, filtered by a specific user.
 * @param {string} userId - The ID of the user to filter the posts by.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of retrieved post objects.
 * @throws {ExistenceError} - If the user with the provided ID does not exist.
 * @throws {TypeError} - on userId wrong type.
 * @throws {ContentError} - on userId wrong characters.
 */

const retrievePosts = (userId) => {
  validateId(userId, 'user id');

  return (async () => {
    const foundUser = await User.findById(userId).lean();
    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exists`);

    const foundPosts = await Post.find()
      .sort('-date')
      .lean()
      .populate('author', '-password -favourites -__v');

    foundPosts.forEach((post) => {
      post.id = post._id.toString();
      delete post._id;
      delete post.__v;

      post.favourites = foundUser.favourites.some(
        (favourites) => favourites.toString() === post.id
      );

      if (post.author._id) post.author.id = post.author._id.toString();
      delete post.author._id;
    });

    return foundPosts;
  })();
};

module.exports = retrievePosts;
