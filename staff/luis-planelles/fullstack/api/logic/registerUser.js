const { readFile, writeFile } = require('fs');
const {
  validators: {
    validateName,
    validateEmail,
    validatePassword,
    validateCallback,
  },
} = require('com');

const registerUser = (name, email, password, callback) => {
  validateName(name);
  validateEmail(email);
  validatePassword(password);
  validateCallback(callback);

  readFile('./data/users.json', 'utf-8', (error, json) => {
    if (error) {
      callback(error);

      return;
    }

    const users = JSON.parse(json);

    let user = users.find((user) => user.email === email);

    if (user) {
      callback(new Error(`user with email ${email} already exists`));

      return;
    }

    let id = 'user-1';

    const lastUser = users[users.length - 1];

    if (lastUser) id = `user-${parseInt(lastUser.id.slice(5)) + 1}`;

    user = {
      id,
      name,
      email,
      password,
      avatar: null,
      favourites: [],
    };

    users.push(user);

    json = JSON.stringify(users, null, 2);

    writeFile('./data/users.json', json, (error) => {
      if (error) {
        callback(error);

        return;
      }

      callback(null);
    });
  });
};

module.exports = registerUser;
