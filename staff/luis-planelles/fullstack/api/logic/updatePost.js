const {
  validators: { validateId, validateUrl, validateText },
  errors: { ExistenceError },
} = require('com');

const { User, Post } = require('../data/models');

/**
 * Updates a post by a user with the provided image and text.
 * @param {string} userId - The ID of the user updating the post.
 * @param {string} postId - The ID of the post to be updated.
 * @param {string} image - The updated URL of the image associated with the post.
 * @param {string} text - The updated text content of the post.
 * @returns {Promise<object>} - A promise that resolves to the result of the update operation.
 * @throws {ExistenceError} - If the user with the provided ID or the post with the provided ID does not exist.
 * @throws {Error} - If the post does not belong to the user.
 * @throws {TypeError} - on userId, postId, image, or text wrong type.
 * @throws {ContentError} - on userId, postId, image, or text wrong characters.
 */

const updatePost = (userId, postId, image, text) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');
  validateUrl(image, 'image');
  validateText(text, 'text');

  return User.findById(userId).then((foundUser) => {
    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exists`);

    return Post.findById(postId).then((foundPost) => {
      if (!foundPost)
        throw new ExistenceError(`post with id ${postId} not exists`);

      if (foundPost.author.toString() !== userId)
        throw new Error(`post ${postId} not belongs to user with id ${userId}`);

      return Post.updateOne(
        { _id: postId },
        { $set: { text, image, date: new Date() } }
      );
    });
  });
};

module.exports = updatePost;
