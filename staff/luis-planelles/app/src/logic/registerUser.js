import { loadUsers, saveUsers } from '../data.js';
import { findUserByEmail } from './helpers/data-managers.js';
import DEFAULT_AVATAR_URL from './helpers/global-variables.js';
import {
  validateCallback,
  validateEmail,
  validateName,
  validatePassword,
} from './helpers/validators.js';

const registerUser = (name, email, password, callback) => {
  validateName(name);
  validateEmail(email);
  validatePassword(password);
  validateCallback(callback);

  findUserByEmail(email, (foundUser) => {
    if (foundUser) {
      callback(new Error('user already exists'));

      return;
    }

    let id = 'user-1';

    loadUsers((users) => {
      const lastUser = users[users.length - 1];

      if (lastUser) {
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1);
      }

      const newUser = {
        id,
        email,
        info: {
          name,
          password,
          avatar: DEFAULT_AVATAR_URL,
          favourites: [],
        },
      };

      users.push(newUser);

      saveUsers(users, () => callback(null));
    });
  });
};

export default registerUser;
