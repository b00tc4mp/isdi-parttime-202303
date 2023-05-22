import { generateUUID } from '../data/helpers';
import { findUserByMail, findUserByUsername } from '../data/data-managers';
import { validateMail, validateNewPassword, validateNewUsername } from '../data/validators-users';
import { loadUsers, saveUsers } from '../data/data';

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
      callback(new Error('user already exists'))
      return
    }

    findUserByUsername(`@${username.toLowerCase()}`, foundUser => {
      if (foundUser) {
        callback(new Error('user already exists'))
        return
      }

      loadUsers(users => {
        const user = {
          id: generateUUID(),
          username: '@' + username.toLowerCase(),
          name: username,
          mail: mail,
          avatar: { random: true, src: Math.random().toString(36).substring(7) },
          password: password,
          joined: new Date(Date.now()),
          favs: new Array,
        };
        
        users.push(user)
        saveUsers(users, () => callback(null))
      }
      )
    })
  })
}

