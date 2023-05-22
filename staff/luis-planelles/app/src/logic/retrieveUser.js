import { findUserById } from './helpers/data-managers.js';

const retrieveUser = (userId) => {
  let foundUser = findUserById(userId);

  if (!foundUser) throw new Error('user not found');

  const retrievedUser = {
    name: foundUser.info.name,
    avatar: foundUser.info.avatar,
    favourites: foundUser.info.favourites,
  };

  return retrievedUser;
};

export default retrieveUser;
