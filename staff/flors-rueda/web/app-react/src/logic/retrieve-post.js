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
export const retrievePost = (userId, postId) => {
    validatePostExists(postId);
    validateUserID(userId);
    const post = findPostById(postId)
    post.date = new Date(post.date)
    return post
}