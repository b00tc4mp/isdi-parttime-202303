import { findUserById } from './helpers/data-managers.js';
import { validateCallback, validateId } from './helpers/validators.js';

const retrieveUser = (userId, callback) => {
  validateId(userId, 'user id');
  validateCallback(callback);

  findUserById(userId, (foundUser) => {
    if (!foundUser) {
      callback(new Error('user not found'));

      return;
    }

    const retrievedUser = {
      name: foundUser.info.name,
      avatar: foundUser.info.avatar,
      favourites: foundUser.info.favourites,
    };

    callback(null, retrievedUser);
  });
};

export default retrieveUser;
