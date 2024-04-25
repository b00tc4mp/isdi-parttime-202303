import { findUserById } from "../data/data-managers";
import { validateCallback, validateId } from "../data/validators";
import { getPokemonSprite } from "./helpers/getPokemonSprite";

/**
 * Generates a new random avatar
 * 
 * @param {string} userId The logged user's id
 * @param {function} callback Function that controls the errors
 * 
 */
export const generateRandomAvatar = (userId, callback) => {
  validateId(userId);
  validateCallback(callback);

  findUserById(userId, user => {
    if (!user) {
      callback(new Error(`User with id ${userId} not found`));
      return;
    }

    getPokemonSprite((error, sprite) => {
      if (error) {
        callback(new Error(error));
      } else {
        callback(null, sprite);
      }
    });
  });
};