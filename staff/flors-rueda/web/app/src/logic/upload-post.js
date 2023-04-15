import { generateUUID } from './data/helpers.js';
import { posts } from './data/posts/data.js';
import { savePosts } from './data/posts/data-managers.js';

export const uploadPost = (postImg, postText, authorID) => {
  const newPost = {};
  newPost.id = generateUUID();
  newPost.author = authorID;
  newPost.text = postText;
  newPost.image = postImg;
  newPost.date =  new Date(Date.now());
  newPost.likes = new Array,
  posts.push(newPost);
  savePosts();
};