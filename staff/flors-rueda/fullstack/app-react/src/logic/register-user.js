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
export default (mail, username, password, repeatPassword, callback) => {
  validateMail(mail);
  //validateUsername(username);
  validateRepeatPassword(password, repeatPassword);
  validateCallback(callback);

  const xhr = new XMLHttpRequest;

  xhr.onload = () => {
    const { status } = xhr;

    if (status !== 201) {
      const { response: json } = xhr;
      const { error } = JSON.parse(json);

      callback(new Error(error));

      return;
    }

    callback(null);
  }

  xhr.onerror = () => {
    callback(new Error('connection error'));
  }

  xhr.open('POST', `${import.meta.env.VITE_API_URL}/users`);

  xhr.setRequestHeader('Content-Type', 'application/json');

  const user = { mail, username, password, repeatPassword };
  const json = JSON.stringify(user);

  xhr.send(json);
}




