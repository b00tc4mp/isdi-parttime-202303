import { findUserById } from '../data/data-managers';
import { validateUserID } from '../data/validators-users';

export const retrieveUser = (userId, callback) => {
  //validateUserID(id);
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