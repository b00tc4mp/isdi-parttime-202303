const { readFile, writeFile } = require('fs');
const {
  validators: { validateId, validateUrl, validateCallback },
} = require('com');

const updateUserAvatar = (userId, newAvatar, callback) => {
  validateId(userId, 'userId');
  validateUrl(newAvatar, 'avatar image');
  validateCallback(callback);

  readFile('./data/users.json', 'utf-8', (error, json) => {
    if (error) {
      callback(error);

      return;
    }

    const users = JSON.parse(json);

    let foundUser = users.find((user) => user.id === userId);

    if (!foundUser) {
      callback(new Error(`user with id ${userId} not found`));

      return;
    }

    foundUser.avatar = newAvatar;

    const updatedJson = JSON.stringify(users);

    writeFile(`./data/users.json`, updatedJson, (error) => {
      if (error) {
        callback(error);

        return;
      }

      callback(null);
    });
  });
};

module.exports = updateUserAvatar;
