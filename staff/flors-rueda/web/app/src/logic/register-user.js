import { generateUUID } from './data/helpers.js';
import users from './data/users/data.js';
import { validateMail, validateNewPassword, validateNewUsername } from './data/users/validators.js';
  
export const addNewUser = (mail, username, password, repeatPassword) => {
  validateMail(mail);
  validateNewUsername(username);
  validateNewPassword(password, repeatPassword);
  let user = {
    id: generateUUID(),
    username: username,
    name: username.replace('@', ''),
    mail: mail,
    password: password,
    joined: new Date(Date.now())
  };
  users.push(user);
  return user
};