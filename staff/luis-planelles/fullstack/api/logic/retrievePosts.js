const context = require('./context');
const {
  validators: { validateId },
} = require('com');

const retrievePosts = (userId) => {
  validateId(userId, 'user id');

  const { users, posts } = context;

  return Promise.all([users.find().toArray(), posts.find().toArray()]).then(
    ([users, posts]) => {
      const user = users.find((user) => user._id.toString() === userId);

      if (!user) throw new Error(`user with id ${userId} not exists`);

      posts.forEach((post) => {
        post.id = post._id.toString();
        delete post._id;

        const author = users.find(
          (user) => user._id.toString() === post.author.toString()
        );

        const { _id, name, avatar } = author;

        post.author = {
          id: _id.toString(),
          name,
          avatar,
        };

        post.favourites = user.favourites.some(
          (favourites) => favourites.toString() === post.id
        );
      });

      return posts.reverse();
    }
  );
};
module.exports = retrievePosts;
