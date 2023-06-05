import { savePost } from '../data/data';
import { findPostById, findUserById } from '../data/data-managers';
import { validators } from 'com';

const { validateCallback, validateId } = validators;

/**
 * Toggles a user into the likes of a post by their ids
 * 
 * @param {string} postId The post id
 * @param {string} userId The user id
 * @param {function} callback Function that controls the errors
 * 
*/
export const toggleLike = (postId, userId, callback) => {
  validateId(postId);
  validateId(userId);
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

        const index = post.likes.indexOf(userId);
        index < 0 ? post.likes.push(userId) : post.likes.splice(index, 1);

        savePost(post, () => callback(null));
    })
})
}
