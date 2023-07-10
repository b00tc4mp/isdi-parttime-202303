const { ObjectId } = require('mongodb');

const context = require('./context');
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

  const { posts, users } = context;

  return users.findOne({ _id: new ObjectId(userId) }).then((foundUser) => {
    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exists`);

    return posts.findOne({ _id: new ObjectId(postId) }).then((foundPost) => {
      if (!foundPost)
        throw new ExistenceError(`post with id ${postId} not exists`);

      if (foundPost.author.toString() !== userId)
        throw new Error(
          `post with id ${postId} not belong to user with id ${userId}`
        );

      return posts.deleteOne({ _id: new ObjectId(postId) });
    });
  });
};

module.exports = deletePost;
