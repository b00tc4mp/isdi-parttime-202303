import { findUserById } from '../data/data-managers';
import { validateCallback } from '../data/validators';

export const retrieveUser = (userId, callback) => {
  validateId(userId);
  validateCallback(callback);

  findUserById(userId, user => {
    if (!user) {
        callback(new Error('user not found'));
        return;
    }

    const _user = {
      username: user.username,
      name: user.name,
      mail: user.mail,
      avatar: user.avatar,
      joined: user.joined,
    }

    callback(null, _user)
  })
};