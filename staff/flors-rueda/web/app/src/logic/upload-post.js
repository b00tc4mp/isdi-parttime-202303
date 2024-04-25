import { generateUUID } from './data/helpers.js';
import { posts } from './data/posts/data.js';
import { savePosts } from './data/posts/data-managers.js';
import { validateUserID } from './data/users/validators.js';
import { validatePostImage, validatePostText } from './data/posts/validators.js';


export const uploadPost = (postImg, postText, authorID) => {
  validateUserID(authorID);
  validatePostImage(postImg)
  validatePostText(postText)
  const newPost = {};
  newPost.id = generateUUID();
  newPost.author = authorID;
  newPost.text = postText;
  newPost.image = postImg;
  newPost.date =  new Date(Date.now());
  newPost.likes = new Array,
  newPost.edited = new Array,
  posts.push(newPost);
  savePosts();
};