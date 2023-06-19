const { readFile, writeFile } = require('fs');
const {
  validators: { validateId, validateCallback },
} = require('com');

const toggleFavouritePost = (userId, postId, callback) => {
  validateId(userId, ' user id');
  validateId(postId, ' post id');
  validateCallback(callback);

  readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    if (error) {
      callback(error);

      return;
    }

    const users = JSON.parse(json);

    const foundUser = users.find((user) => user.id === userId);

    if (!foundUser) {
      callback(new Error(`user with id ${userId} not exists`));

      return;
    }

    readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
      if (error) {
        callback(error);

        return;
      }

      const posts = JSON.parse(json);

      const foundPost = posts.find((post) => post.id === postId);

      if (!foundPost) {
        callback(new Error(`post with id ${postId} not exists`));

        return;
      }

      const index = foundPost.favourites.indexOf(foundUser.id);

      if (index < 0) foundPost.favourites.push(foundUser.id);
      else foundPost.favourites.splice(index, 1);

      posts.push(foundPost);

      json = JSON.stringify(posts, null, 2);

      writeFile(`${process.env.DB_PATH}/posts.json`, json, (error) => {
        if (error) {
          callback(error);

          return;
        }

        callback(null);
      });
    });
  });
};

module.exports = toggleFavouritePost;
