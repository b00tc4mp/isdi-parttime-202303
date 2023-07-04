const { ObjectId } = require('mongodb');
const context = require('./context');
const {
  validators: { validateId, validateUrl, validateText },
} = require('com');

const createPost = (userId, image, text) => {
  validateId(userId, ' user id');
  validateUrl(image, 'image');
  validateText(text, 'text');

  const { posts, users } = context;

  return users.findOne({ _id: new ObjectId(userId) }).then((user) => {
    if (!user) throw new Error(`user with id ${userId} doesnt exists`);

    posts.insertOne({
      author: user._id,
      image,
      text,
      date: new Date(),
      likes: [],
    });
  });
};

module.exports = createPost;
