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

        if (!author) {
          throw new Error(`Author not found for post with ID ${post.id}`);
        }

        post.author = {
          id: author._id.toString(),
          name: author.name,
          avatar: author.avatar,
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
