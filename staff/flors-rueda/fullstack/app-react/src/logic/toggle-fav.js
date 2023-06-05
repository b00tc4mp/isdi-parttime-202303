import { findPostById, findUserById } from '../data/data-managers';
import { saveUser } from '../data/data';
import { validators } from 'com';

const { validateCallback, validateId } = validators;

/**
 * Toggles a post into the favs of a user by their ids
 * 
 * @param {string} postId The post id
 * @param {string} userId The user id
 * @param {function} callback Function that controls the errors
 * 
*/
export const toggleFav = (postId, userId, callback) => {
  validateId(userId);
  validateId(postId);
  validateCallback(callback);

  findUserById(userId, user => {
    if (!user) {
        callback(new Error(`user with id ${userId} not found`));
        return;
    }

    findPostById(postId, post => {
        if (!post) {
            callback(new Error(`post with id ${postId} not found`));
            return;
        }
        const index = user.favs.indexOf(postId);
        index < 0 ? user.favs.push(postId) : user.favs.splice(index, 1);
        
        saveUser(user, () => callback(null));
    })
})
}