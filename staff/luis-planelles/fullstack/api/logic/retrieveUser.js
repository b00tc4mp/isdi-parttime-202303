const { readFile } = require('fs');
const {
  validators: { validateId, validateCallback },
} = require('com');

const retrieveUser = (userId, callback) => {
  validateId(userId, 'user id');
  validateCallback(callback);

  readFile(`${process.env.DB_PATH}/users.json`, 'utf-8', (error, json) => {
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

    const retrievedUser = {
      name: foundUser.name,
      email: foundUser.email,
      avatar: foundUser.avatar,
    };

    callback(null, retrievedUser);
  });
};

module.exports = retrieveUser;
