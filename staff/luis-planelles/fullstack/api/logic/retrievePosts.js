const context = require('./context');
const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

/**
 * Retrieves all posts and their associated details, filtered by a specific user.
 * @param {string} userId - The ID of the user to filter the posts by.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of retrieved post objects.
 * @throws {ExistenceError} - If the user with the provided ID does not exist.
 */

const retrievePosts = (userId) => {
  validateId(userId, 'user id');

  const { users, posts } = context;

  return Promise.all([users.find().toArray(), posts.find().toArray()]).then(
    ([users, posts]) => {
      const user = users.find((user) => user._id.toString() === userId);

      if (!user) throw new ExistenceError(`user with id ${userId} not exists`);

      posts.forEach((post) => {
        post.id = post._id.toString();
        delete post._id;

        const author = users.find(
          (user) => user._id.toString() === post.author.toString()
        );

        const { _id, name, avatar } = author;

        post.author = {
          id: _id.toString(),
          name,
          avatar,
        };

        post.favourites = user.favourites.some(
          (favourites) => favourites.toString() === post.id
        );
      });

      return posts.reverse();
    }
  );
};
module.exports = retrievePosts;
