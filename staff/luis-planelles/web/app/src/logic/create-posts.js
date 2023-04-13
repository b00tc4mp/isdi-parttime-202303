import { posts, savePost } from '../data.js';
import { findUserById } from './helpers/data-managers.js';
import { validateUrl, validateText } from './helpers/validators.js';

const createPost = (userId, postImage, postText) => {
  validateUrl(postImage, 'image url');
  validateText(postText);

  const foundUser = findUserById(userId);

  if (!foundUser) throw new Error('User not found');

  let postId = 'post-1';
  const lastPost = posts[posts.length - 1];

  if (lastPost) postId = 'post-' + (parseInt(lastPost.id.slice(5)) + 1);

  posts.push({
    id: postId,
    author: userId,
    image: postImage,
    text: postText,
    date: new Date(),
  });

  savePost();
};

export default createPost;
