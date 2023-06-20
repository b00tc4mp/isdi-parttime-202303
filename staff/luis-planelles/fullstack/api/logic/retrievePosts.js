const { readFile } = require('fs');
const {
  validators: { validateId, validateCallback },
} = require('com');

const retrievePosts = (userId, callback) => {
  validateId(userId, 'user id');
  validateCallback(callback);

  readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    if (error) {
      callback(error);

      return;
    }

    const users = JSON.parse(json);

    const user = users.find((user) => user.id === userId);

    if (!user) {
      callback(new Error(`user with id ${userId} not found`));

      return;
    }

    readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
      if (error) {
        callback(error);

        return;
      }

      const posts = JSON.parse(json);

      posts.forEach((post) => {
        const userAuthor = users.find((user) => user.id === post.author);

        post.favourites = user.favourites.includes(post.id);
        post.date = new Date(post.date);

        post.author = {
          id: userAuthor.id,
          name: userAuthor.name,
          avatar: userAuthor.avatar,
        };
      });

      callback(null, posts.reverse());
    });
  });
};

module.exports = retrievePosts;
