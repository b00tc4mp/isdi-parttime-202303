import { findUserByEmail } from './helpers/data-managers.js';
import {
  validateCallback,
  validateEmail,
  validatePassword,
} from './helpers/validators.js';

const authenticateUser = (email, password, callback) => {
  validateEmail(email);
  validatePassword(password, 'password');
  validateCallback(callback);

  findUserByEmail(email, (user) => {
    if (!user || user.info.password !== password) {
      callback(new Error('authentication failed'));

      return;
    }

    callback(null, user.id);
  });
};

export default authenticateUser;
