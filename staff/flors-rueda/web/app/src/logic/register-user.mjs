import { generateUUID } from './data/helpers.mjs';
import users from './data/users/data.mjs';
import { validateMail, validateNewPassword, validateNewUsername } from './data/users/validators.mjs';
  
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