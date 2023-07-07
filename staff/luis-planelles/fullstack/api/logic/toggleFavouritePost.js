const context = require('./context');
const {
  validators: { validateId },
} = require('com');
const { ObjectId } = require('mongodb');

const toggleFavouritePost = (userId, postId) => {
  validateId(userId, ' user id');
  validateId(postId, ' post id');

  const { users, posts } = context;

  return users.findOne({ _id: new ObjectId(userId) }).then((foundUser) => {
    if (!foundUser) throw new Error(`user with id ${userId} not exists`);

    return posts.findOne({ _id: new ObjectId(postId) }).then((foundPost) => {
      if (!foundPost) throw new Error(`post with id ${postId} not exists`);

      const index = foundUser.favourites.indexOf(postId);

      if (index < 0) {
        foundUser.favourites.push(postId);
      } else {
        foundUser.favourites.splice(index, 1);
      }

      return users.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { favourites: foundUser.favourites } }
      );
    });
  });
};

module.exports = toggleFavouritePost;
