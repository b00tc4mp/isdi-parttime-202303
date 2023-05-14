import { generateUUID } from '../data/helpers';
import { validatePostImage, validatePostText } from '../data/validators-posts';
import { validateUserID } from '../data/validators-users';
import { savePosts } from '../data/data-managers';
import posts from '../data/posts';

/**
 * Creates a post by it's image and text.
 * 
 * @param {string} postImg The base64 string of the post image
 * @param {string} postText The post text
 * @param {string} authorID The user logged id
 * 
 */
export const uploadPost = (postImg, postText, authorID) => {
  validateUserID(authorID);
  validatePostImage(postImg);
  validatePostText(postText);
  const post = {};
  post.id = generateUUID();
  post.author = authorID;
  post.text = postText;
  post.image = postImg;
  post.date =  new Date(Date.now());
  post.likes = new Array;
  post.edited = new Array;
  const _posts = posts();
  _posts.push(post);
  savePosts(_posts);
};