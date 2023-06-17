const { readFile, writeFile } = require('fs');

const {
  validators: { validateId, validateCallback, validateUrl, validateText },
} = require('com');

const updatePost = (userId, postId, image, text, callback) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');
  validateUrl(image, 'image');
  validateText(text, 'text');
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

      if (foundPost.author !== userId) {
        callback(
          new Error(`post ${postId} not belongs to user with id ${userId}`)
        );

        return;
      }

      foundPost.text = text;
      foundPost.image = image;
      foundPost.date = new Date();

      json = JSON.stringify(posts);

      writeFile(`${process.env.DB_PATH}/posts.json`, json, (error) => {
        if (error) {
          callback(error);

          return;
        }
      });

      callback(null, foundPost);
    });
  });
};

module.exports = updatePost;
