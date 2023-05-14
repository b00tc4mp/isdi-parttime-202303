import users from '../data/users.js';
import { validateUserID } from '../data/validators-users.js';

export const retrieveUser = (id) => {
  validateUserID(id);
  const _users = users() 
  const _user = _users.filter((user) => user.id === id);
  let user = {
    username: _user[0].username,
    name: _user[0].name,
    avatar: _user[0].avatar,
    favs: _user[0].favs,
    joined: _user[0].joined,
  };
  return user;
};