import { validateUsername, validateUserPassword} from './data/users/validators.mjs'

import { getId } from './data/users/data-managers.mjs'

export const authenticateUser = (user, password) => {
  const username = '@' + user.toLowerCase();
  validateUsername(username)
  const id = getId(username)
  validateUserPassword(id, password) 
  return id;
};