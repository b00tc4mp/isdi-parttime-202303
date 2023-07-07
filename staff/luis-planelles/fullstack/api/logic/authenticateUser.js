const context = require('./context');
const {
  validators: { validateEmail, validatePassword },
} = require('com');

const authenticateUser = (email, password) => {
  validateEmail(email);
  validatePassword(password);

  const { users } = context;

  return users.findOne({ email }).then((user) => {
    if (!user) throw new Error('user not exist');

    if (user.password !== password) throw new Error('wrong credentials');

    return user._id.toString();
  });
};

module.exports = authenticateUser;
