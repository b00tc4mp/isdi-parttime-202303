import { findPostById, findUserById} from '../data/data-managers';
import { savePost } from '../data/data';
import { validateCallback, validateId, validateImage, validatePostText } from '../data/validators';

/**
 * Edits the post text and image
 * 
 * @param {string} newText The post text
 * @param {string} newPostImg The base64 string of the post image
 * @param {string} id The id of the post to edit
 * @param {string} userId The user logged id
 * 
 */
export const updatePost = (newText, newPostImg, postId, userId, callback) => {
  validateId(postId);
  validateId(userId);
  validatePostText(newText);
  validateImage(newPostImg);
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

        if (post.author !== userId) {
            callback(new Error(`post with id ${postId} does not belong to user with id ${userId}`));
            return;
        }

        post.text = newText;
        post.image= newPostImg;
        (post.edited).push(new Date)
        savePost(post, () => callback(null))
    })
})
}