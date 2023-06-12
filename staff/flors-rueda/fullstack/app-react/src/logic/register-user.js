import { generateUUID } from './helpers/generateUUID';
import { findUserByMail, findUserByUsername } from '../data/data-managers';
import { loadUsers, saveUsers } from '../data/data';
import { getPokemonSprite } from './helpers/getPokemonSprite';
import { validators } from 'com';

const { validateCallback, validateMail, validateRepeatPassword, validateUsername } = validators;

/**
 * Creates a user by mail, username and password. Adds the rest of the info.
 * 
 * @param {string} mail The new user's mail
 * @param {string} username The new user's username
 * @param {string} password The new user's password
 * @param {string} repeatPassword The confirmation password
 * @param {function} callback Function that controls the errors
 * 
 */

//TODO check username formats
export const registerUser = (mail, username, password, repeatPassword, callback) => {
  validateMail(mail);
  validateUsername(username);
  validateRepeatPassword(password, repeatPassword);
  validateCallback(callback);

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
            username: `@${username.toLowerCase()}`,
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
  })
}

