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
 * @throws {Error} - If the post does not belong to the user.
 * @throws {ExistenceError} - If the user with the provided ID or the post with the provided ID does not exist.
 * @throws {TypeError} - on userId or postId wrong type.
 * @throws {ContentError} - on userId or postId wrong characters.
 */

const deleteComment = (userId, postId, commentId) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');
  validateId(commentId, 'comment id');

  return (async () => {
    const [foundUser, foundPost] = await Promise.all([
      User.findById(userId),
      Post.findById(postId),
    ]);

    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exists`);
    if (!foundPost)
      throw new ExistenceError(`post with id ${postId} not exists`);

    const index = foundPost.comments.findIndex(
      (comment) => comment.id === commentId
    );

    if (index < 0)
      throw new Error(
        `comment with id ${commentId} not exists in post with id ${postId}`
      );

    const comment = foundPost.comments[index];

    if (comment.author.toString() !== userId)
      throw new Error(
        `comment with id ${commentId} does not belong to user with id ${userId}`
      );

    foundPost.comments.splice(index, 1);

    await foundPost.save();
  })();
};

module.exports = deleteComment;
