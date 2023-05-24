import { generateUUID } from './helpers/generateUUID';
import { findUserByMail, findUserByUsername } from '../data/data-managers';
import { validateMail, validateNewPassword, validateNewUsername } from '../data/validators-users';
import { loadUsers, saveUsers } from '../data/data';
import { getPokemonSprite } from './helpers/getPokemonSprite';

/**
 * Creates a user by mail, username and password. Adds the rest of the info.
 * 
 * @param {string} mail The new user's mail
 * @param {string} username The new user's username
 * @param {string} password The new user's password
 * @param {string} repeatPassword The confirmation password
 * 
 */
export const registerUser = (mail, username, password, repeatPassword, callback) => {
  //validateMail(mail);
  //validateNewUsername(`@${username.toLowerCase()}`);
  //validateNewPassword(password, repeatPassword);
  findUserByMail(mail, foundUser => {
    if (foundUser) {
      callback(new Error('User already exists'));
      return;
    }

    findUserByUsername(`@${username.toLowerCase()}`, foundUser => {
      if (foundUser) {
        callback(new Error('User already exists'));
        return;
      }

      getPokemonSprite((error, avatar) => {
        if (error) {
          callback(new Error(error));
          return;
        }

        loadUsers(users => {
          const user = {
            id: generateUUID(),
            username: '@' + username.toLowerCase(),
            name: username,
            mail: mail,
            avatar: avatar,
            password: password,
            joined: new Date(Date.now()),
            favs: [],
          };

          users.push(user);
        saveUsers(users, () => callback(null))
      }
      )
    })
  })
})}

