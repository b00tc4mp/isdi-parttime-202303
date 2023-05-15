import { findUserById } from '../data/data-managers.js';
import users from '../data/users.js';
import { validateUserID } from '../data/validators-users.js';

export const retrieveUser = (id) => {
  validateUserID(id);
  const _user = findUserById(id);
  let user = {
    username: _user.username,
    name: _user.name,
    avatar: _user.avatar,
    favs: _user.favs,
    joined: _user.joined,
  };
  return user;
};