const context = require('./context');
const {
  validators: { validateId, validateUrl, validateText },
} = require('com');
const { ObjectId } = require('mongodb');

const updatePost = (userId, postId, image, text) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');
  validateUrl(image, 'image');
  validateText(text, 'text');

  const { users, posts } = context;

  return users.findOne({ _id: new ObjectId(userId) }).then((foundUser) => {
    if (!foundUser) throw new Error(`user with id ${userId} not exists`);

    return posts.findOne({ _id: new ObjectId(postId) }).then((foundPost) => {
      if (!foundPost) throw new Error(`post with id ${postId} not exists`);

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
