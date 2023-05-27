import { findUserById } from './helpers/data-managers.js';

const retrieveUser = (userId, callback) => {
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
