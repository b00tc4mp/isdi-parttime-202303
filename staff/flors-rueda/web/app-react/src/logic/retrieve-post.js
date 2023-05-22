import { validatePostExists } from '../data/validators-posts';
import { validateUserID } from '../data/validators-users';
import { findPostById } from '../data/data-managers';

/**
 * Retrieve's all the post data
 * 
 * @param {string} userId The user logged id
 * @param {string} postId The id of the post to edit
 * 
 * @returns a post object = { id: string, author: string, text: string, image: string, date: date, edited: array of dates, likes: array of strings}
 */
export const retrievePost = (userId, postId, callback) => {
    //validatePostExists(postId);
    //validateUserID(userId);

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