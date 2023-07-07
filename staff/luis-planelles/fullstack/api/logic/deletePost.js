const context = require('./context');
const {
  validators: { validateId },
} = require('com');
const { ObjectId } = require('mongodb');

const deletePost = (userId, postId) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');

  const { posts, users } = context;

  return users.findOne({ _id: new ObjectId(userId) }).then((foundUser) => {
    if (!foundUser) throw new Error(`user with id ${userId} not exists`);

    return posts.findOne({ _id: new ObjectId(postId) }).then((foundPost) => {
      if (!foundPost) throw new Error(`post with id ${postId} not exists`);

      if (foundPost.author.toString() !== userId)
        throw new Error(
          `post with id ${postId} not belong to user with id ${userId}`
        );

      return posts.deleteOne({ _id: new ObjectId(postId) });
    });
  });
};

module.exports = deletePost;
