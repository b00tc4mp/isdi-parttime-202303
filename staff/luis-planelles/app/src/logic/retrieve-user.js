import { findUserById } from './helpers/data-managers.js';

const retrieveUser = (userId) => {
  const foundUser = findUserById(userId);

  if (!foundUser) throw new Error('user not found');
  const user = {
    name: foundUser.info.name,
  };

  if (foundUser.info.avatar) user.avatar = foundUser.info.avatar;

  return user;
};

export default retrieveUser;
