import { helpers, validators } from 'com';

const { getPokemonSprite } = helpers;
const { validateCallback } = validators;

/**
 * Generates a new random avatar
 * 
 * @param {function} callback Function that controls the errors
 * 
 */
export default (callback) => {
  validateCallback(callback);

  getPokemonSprite((error, sprite) => {
    if (error) {
      callback(new Error(error));
    } else {
      callback(null, sprite);
    }
  });

};