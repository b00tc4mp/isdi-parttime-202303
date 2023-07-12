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

  return Promise.all([User.find(), Post.find()]).then(([users, posts]) => {
    const user = users.find((user) => user._id.toString() === userId);

    if (!user) throw new ExistenceError(`user with id ${userId} not exists`);

    posts.forEach((post) => {
      post.id = post.id;
      delete post._id;

      const author = users.find((user) => user.id === post.author.toString());

      post.author = {
        id: author._id.toString(),
        name: author.name,
        avatar: author.avatar,
      };

      post.favourites = user.favourites.some(
        (favourites) => favourites === post.id
      );
    });

    return posts.reverse();
  });
};
module.exports = retrievePosts;
