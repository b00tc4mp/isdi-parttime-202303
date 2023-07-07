const context = require('./context');
const {
  validators: { validateId },
} = require('com');
const { ObjectId } = require('mongodb');

const retrievePost = (userId, postId) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');

  const { users, posts } = context;

  return users.findOne({ _id: new ObjectId(userId) }).then((foundUser) => {
    if (!foundUser) throw new Error(`user with id ${userId} not exists`);

    return posts.findOne({ _id: new ObjectId(postId) }).then((foundPost) => {
      if (!foundPost) throw new Error(`post with id ${postId} not exists`);

      return foundPost;
    });
  });
};

module.exports = retrievePost;
