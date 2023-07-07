const context = require('./context');
const {
  validators: { validateId },
} = require('com');
const { ObjectId } = require('mongodb');

const toggleLikePost = (userId, postId) => {
  validateId(userId, ' user id');
  validateId(postId, ' post id');

  const { users, posts } = context;

  return users.findOne({ _id: new ObjectId(userId) }).then((foundUser) => {
    if (!foundUser) throw new Error(`user with id ${userId} not exists`);

    return posts.findOne({ _id: new ObjectId(postId) }).then((foundPost) => {
      if (!foundPost) throw new Error(`post with id ${postId} not exists`);

      const index = foundPost.likes.indexOf(userId);

      if (index < 0) {
        foundPost.likes.push(userId);
      } else {
        foundPost.likes.splice(index, 1);
      }
      return posts.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { likes: foundPost.likes } }
      );
    });
  });
};

module.exports = toggleLikePost;
