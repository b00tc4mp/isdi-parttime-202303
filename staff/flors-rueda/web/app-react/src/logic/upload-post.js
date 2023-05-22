import { loadPosts, savePosts } from '../data/data';
import { findUserById } from '../data/data-managers';
import { generateUUID } from '../data/helpers';
import { validatePostImage, validatePostText } from '../data/validators-posts';
import { validateUserID } from '../data/validators-users';


/**
 * Creates a post by it's image and text.
 * 
 * @param {string} postImg The base64 string of the post image
 * @param {string} postText The post text
 * @param {string} authorID The user logged id
 * 
 */
export const uploadPost = (postImg, postText, authorId, callback) => {
  //validateUserID(authorID);
  //validatePostImage(postImg);
  //validatePostText(postText);

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
        posts.push(post)
        savePosts(posts, () => callback(null))
    })
})
}
