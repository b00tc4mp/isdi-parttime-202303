const { User, Post } = require('../data/models');

const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

/**
 * Deletes a post by a user.
 * @param {string} userId - The ID of the user deleting the post.
 * @param {string} postId - The ID of the post to be deleted.
 * @returns {Promise<object>} - A promise that resolves to the result of the deletion operation.
 * @throws {ExistenceError} - If the user with the provided ID or the post with the provided ID does not exist.
 * @throws {Error} - If the post does not belong to the user.
 * @throws {TypeError} - on userId or postId wrong type.
 * @throws {ContentError} - on userId or postId wrong characters.
 */

const deletePost = (userId, postId) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');

  return (async () => {
    const [foundUser, foundPost] = await Promise.all([
      User.findById(userId),
      Post.findById(postId),
    ]);

    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exists`);
    if (!foundPost)
      throw new ExistenceError(`post with id ${postId} not exists`);

    if (foundPost.author.toString() !== userId)
      throw new Error(
        `post with id ${postId} not belong to user with id ${userId}`
      );

    await Post.deleteOne({ _id: postId }).then(() => {});
  })();
};

module.exports = deletePost;
