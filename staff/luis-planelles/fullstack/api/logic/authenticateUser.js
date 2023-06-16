const { readFile } = require('fs');
const {
  validators: { validateEmail, validatePassword, validateCallback },
} = require('com');

const authenticateUser = (email, password, callback) => {
  validateEmail(email, 'email');
  validatePassword(password, 'password');
  validateCallback(callback);

  readFile(`${process.env.DB_PATH}/users.json`, 'utf-8', (error, json) => {
    if (error) {
      callback(error);

      return;
    }

    const users = JSON.parse(json);

    let user = users.find((user) => user.email === email);

    if (!user) {
      callback(new Error(`user with email ${email} not found`));

      return;
    }

    if (user.password !== password) {
      callback(new Error('wrong credentials'));

      return;
    }

    callback(null, user.id);
  });
};

module.exports = authenticateUser;