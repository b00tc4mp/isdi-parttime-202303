import { findUserByEmail } from './helpers/data-managers.js';

const authenticateUser = (email, password) => {
  const foundUser = findUserByEmail(email);

  if (!foundUser || foundUser.info.password !== password)
    throw new Error('authentication failed');

  return foundUser.id;
};

export default authenticateUser;
