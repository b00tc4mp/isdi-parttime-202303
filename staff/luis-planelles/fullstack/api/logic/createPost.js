const { readFile, writeFile } = require('fs');
const {
  validators: { validateId, validateUrl, validateText, validateCallback },
} = require('com');

const createPost = (userId, image, text, callback) => {
  validateId(userId, ' user id');
  validateUrl(image, 'image');
  validateText(text, 'text');
  validateCallback(callback);

  readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
    if (error) {
      callback(error);

      return;
    }

    const users = JSON.parse(json);

    let user = users.find((user) => user.id === userId);

    if (!user) {
      callback(new Error(`user with id ${userId} doesnt exists`));

      return;
    }

    readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
      if (error) {
        callback(error);

        return;
      }

      const posts = JSON.parse(json);

      let id = 'post-1';

      const lastPost = posts[posts.length - 1];

      if (lastPost) id = `post-${parseInt(lastPost.id.slice(5)) + 1}`;

      newPost = {
        id,
        author: userId,
        image,
        text,
        date: new Date(),
        likes: [],
      };

      posts.push(newPost);

      json = JSON.stringify(posts);

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

module.exports = createPost;
