const context = require('./context');
const {
  validators: { validateId, validateUrl, validateText },
  errors: { ExistenceError },
} = require('com');
const { ObjectId } = require('mongodb');

/**
 * Updates a post by a user with the provided image and text.
 * @param {string} userId - The ID of the user updating the post.
 * @param {string} postId - The ID of the post to be updated.
 * @param {string} image - The updated URL of the image associated with the post.
 * @param {string} text - The updated text content of the post.
 * @returns {Promise<object>} - A promise that resolves to the result of the update operation.
 * @throws {ExistenceError} - If the user with the provided ID or the post with the provided ID does not exist.
 * @throws {Error} - If the post does not belong to the user.
 */

const updatePost = (userId, postId, image, text) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');
  validateUrl(image, 'image');
  validateText(text, 'text');

  const { users, posts } = context;

  return users.findOne({ _id: new ObjectId(userId) }).then((foundUser) => {
    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exists`);

    return posts.findOne({ _id: new ObjectId(postId) }).then((foundPost) => {
      if (!foundPost)
        throw new ExistenceError(`post with id ${postId} not exists`);

      if (foundPost.author.toString() !== userId)
        throw new Error(`post ${postId} not belongs to user with id ${userId}`);

      return posts.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { text, image, date: new Date() } }
      );
    });
  });
};

module.exports = updatePost;
