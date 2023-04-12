import { generateUUID } from './data/helpers.mjs';
import posts from './data/posts/data.mjs';

export const uploadPost = (postImg, postText, authorID) => {
  const newPost = {};
  newPost.id = generateUUID();
  newPost.author = authorID;
  newPost.text = postText;
  newPost.image = postImg;
  newPost.date =  new Date(Date.now());
  posts.push(newPost);
};