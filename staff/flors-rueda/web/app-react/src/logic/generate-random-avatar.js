import { findUserById } from "../data/data-managers";
import { getPokemonSprite } from "./helpers/getPokemonSprite";


export const generateRandomAvatar = (userId, callback) => {
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