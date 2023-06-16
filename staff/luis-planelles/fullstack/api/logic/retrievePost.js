const { readFile } = require('fs');
const {
  validators: { validateId, validateCallback },
} = require('com');

const retrievePost = (userId, postId, callback) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');
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

      const foundpost = posts.find((post) => post.id === postId);

      if (!foundpost) {
        callback(new Error(`post with id ${postId} not exists`));

        return;
      }

      callback(null, foundpost);
    });
  });
};

module.exports = retrievePost;
