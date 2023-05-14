import { validateUsername, validateUserPassword} from '../data/validators-users';
import { getId } from '../../../app/src/logic/data/users/data-managers';

/**
 * Authenticates a user by username and password
 * 
 * @param {string} user The user's username
 * @param {string} password The user's password
 * 
 * @returns {string} The user's id
 */
export const authenticateUser = (user, password) => {
  const username = '@' + user.toLowerCase();
  validateUsername(username);
  const id = getId(username);
  validateUserPassword(id, password) ;
  return id;
};