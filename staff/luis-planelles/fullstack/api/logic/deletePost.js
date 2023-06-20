const { readFile, writeFile } = require('fs');
const {
  validators: { validateId, validateCallback },
} = require('com');

const deletePost = (userId, postId, callback) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');
  validateCallback(callback);

  readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    if (error) {
      callback(error);

      return;
    }

    const users = JSON.parse(json),
      user = users.find((user) => user.id === userId);

    if (!user) {
      callback(new Error(`user with id ${userId} not exists`));

      return;
    }

    readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
      if (error) {
        callback(error);

        return;
      }

      const posts = JSON.parse(json),
        foundPost = posts.find((post) => post.id === postId);

      if (!foundPost) {
        callback(new Error(`post with id ${postId} not exists`));

        return;
      }

      if (foundPost.author !== userId) {
        callback(
          new Error(
            `post with id ${postId} not belong to user with id ${userId}`
          )
        );

        return;
      }

      const postIndex = posts.findIndex((post) => post.id === postId);

      if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        json = JSON.stringify(posts);

        writeFile(`${process.env.DB_PATH}/posts.json`, json, (error) => {
          if (error) {
            callback(error);

            return;
          }
        });
      }
      callback(null);
    });
  });
};

module.exports = deletePost;
