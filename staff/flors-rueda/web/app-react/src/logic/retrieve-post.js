import { findPostById, findUserById } from '../data/data-managers';
import { validateCallback, validateId } from '../data/validators';

/**
 * Retrieve's all the post data
 * 
 * @param {string} userId The user logged id
 * @param {string} postId The id of the post to edit
 * @param {function} callback Function that controls the errors
 * 
 * @returns a post object
 */
export const retrievePost = (userId, postId, callback) => {
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
            post.date = new Date(post.date);
            callback(null, post);
        })
    })
}