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

export default (mail, username, password, repeatPassword) => {
  validateMail(mail);
  //validateUsername(username);
  validateRepeatPassword(password, repeatPassword);

  const user = { mail, username, password, repeatPassword };

  return fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => {
      if (res.status !== 201) return res.json().then(({ error }) => { throw new Error(error) })
    })
}




