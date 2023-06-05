import { loadPosts, savePosts } from '../data/data';
import { findUserById } from '../data/data-managers';
import { generateUUID } from './helpers/generateUUID';
import { validateCallback, validateId, validatePostText } from '../data/validators';

/**
 * Creates a post by it's image and text.
 * 
 * @param {string} postImg The base64 string of the post image
 * @param {string} postText The post text
 * @param {string} authorId The user logged id
 * @param {function} callback Function that controls the errors
 * 
 */
export const uploadPost = (postImg, postText, authorId, callback) => {
  validateId(authorId);
  validatePostText(postText);
  validateCallback(callback);
  
  findUserById(authorId, user => {
    if (!user) {
        callback(new Error(`user with id ${authorId} not found`));
        return;
    }

    loadPosts(posts => {
        const post = {};
        post.id = generateUUID();
        post.author = authorId;
        post.text = postText;
        post.image = postImg;
        post.date =  new Date(Date.now());
        post.likes = new Array;
        post.edited = new Array;
        post.isPublic = true
        posts.push(post)
        savePosts(posts, () => callback(null))
    })
})
}
