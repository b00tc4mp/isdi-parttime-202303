const {
  validators: { validateId, validateUrl, validateText },
  errors: { ExistenceError },
} = require('com');
const { User, Post } = require('../data/models');

/**
 * Creates a new post by a user.
 * @param {string} userId - The ID of the user creating the post.
 * @param {string} image - The URL of the image associated with the post.
 * @param {string} text - The text content of the post.
 * @returns {Promise<object>} - A promise that resolves to the created post object.
 * @throws {ExistenceError} - If the user with the provided ID does not exist.
 * @throws {TypeError} - on userId, text or image wrong type.
 * @throws {ContentError} - on userId, text or image wrong characters.
 */

const createPost = (userId, image, text) => {
  validateId(userId, ' user id');
  validateUrl(image, 'image');
  validateText(text, 'text');

  return (async () => {
    const foundUser = await User.findById(userId);

    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} doesnt exists`);

    await Post.create({
      author: foundUser._id,
      image,
      text,
      date: new Date(),
    });
  })();
};

module.exports = createPost;
