import posts from './posts/data.mjs';

export const uploadPost = (postImg, postText, authorID) => {
  const newPost = {};
  newPost.author = authorID;
  newPost.text = postText;
  newPost.image = postImg;
  newPost.date =  new Date(Date.now());
  posts.push(newPost);
};