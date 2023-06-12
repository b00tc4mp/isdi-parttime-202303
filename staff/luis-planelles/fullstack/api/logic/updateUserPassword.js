const { readFile, writeFile } = require('fs');
const {
  validators: { validateId, validatePassword, validateCallback },
} = require('com');

const updateUserPassword = (
  userId,
  password,
  newPassword,
  newPasswordConfirm,
  callback
) => {
  validateId(userId, 'user id');
  validatePassword(password);
  validatePassword(newPassword, 'new password');
  validatePassword(newPasswordConfirm, 'new password confirm');
  validateCallback(callback);

  if (newPassword === password)
    throw new Error('new password equals old password');

  validatePassword(newPasswordConfirm, 'new password confirm');

  if (newPassword !== newPasswordConfirm)
    throw new Error('password confirmation mismatch');

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

    if (password !== foundUser.password) {
      callback(new Error('wrong password'));

      return;
    }

    foundUser.password = newPassword;

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

module.exports = updateUserPassword;
