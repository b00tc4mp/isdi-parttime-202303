import { validateUsername, validateUserPassword} from './data/users/validators.js'

import { getId } from './data/users/data-managers.js'

export const authenticateUser = (user, password) => {
  const username = '@' + user.toLowerCase();
  validateUsername(username)
  const id = getId(username)
  validateUserPassword(id, password) 
  return id;
};