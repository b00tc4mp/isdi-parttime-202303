//
import { users } from '../../data.js';

const findUserByEmail = (email) => {
  let foundUser;

  for (let i = 0; i < users.length; i++) {
    let user = users[i];

    if (user.email === email) {
      foundUser = user;

      break;
    }
  }

  return foundUser;
};

const findUserById = (userId) => {
  let foundUser;

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    if (user.id === userId) {
      foundUser = user;

      break;
    }
  }

  return foundUser;
};

export { findUserByEmail, findUserById };
