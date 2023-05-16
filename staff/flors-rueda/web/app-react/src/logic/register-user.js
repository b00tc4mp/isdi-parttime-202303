import { generateUUID } from '../data/helpers';
import users from '../data/users';
import { saveUsers } from '../data/data-managers';
import { validateMail, validateNewPassword, validateNewUsername } from '../data/validators-users';

/**
 * Creates a user by mail, username and password. Adds the rest of the info.
 * 
 * @param {string} mail The new user's mail
 * @param {string} username The new user's username
 * @param {string} password The new user's password
 * @param {string} repeatPassword The confirmation password
 * 
 */
export const registerUser = (mail, username, password, repeatPassword) => {
  validateMail(mail);
  validateNewUsername(`@${username.toLowerCase()}`);
  validateNewPassword(password, repeatPassword);
  let user = {
    id: generateUUID(),
    username: '@' + username.toLowerCase(),
    name: username,
    mail: mail,
    avatar: {random: true, src: Math.random().toString(36).substring(7)},
    password: password,
    joined: new Date(Date.now()),
    favs: new Array,
  };
  const _users = users();
  _users.push(user);
  saveUsers(_users);
};