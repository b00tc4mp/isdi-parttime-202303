const {
  validators: { validateId, validateText },
  errors: { ExistenceError },
} = require('com');

const { User, Post, Comment } = require('../data/models');

/**
 * Toggles the like status of a post for a user.
 * @param {string} userId - The ID of the user toggling the like.
 * @param {string} postId - The ID of the post to toggle the like.
 * @returns {Promise<object>} - A promise that resolves to the result of the update operation.
 * @throws {ExistenceError} - If the user with the provided ID or the post with the provided ID does not exist.
 * @throws {TypeError} - on userId or postId wrong type.
 * @throws {ContentError} - on userId or postId wrong characters.
 */

const addComment = (userId, postId, text) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');
  validateText(text);

  return (async () => {
    const [foundUser, foundPost] = await Promise.all([
      User.findById(userId),
      Post.findById(postId),
    ]);

    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exists`);
    if (!foundPost)
      throw new ExistenceError(`post with id ${postId} not exists`);

    const comment = new Comment({
      author: userId,
      text,
    });

    foundPost.comments.push(comment);

    await foundPost.save();
  })();
};

module.exports = addComment;
