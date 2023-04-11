import { posts } from '../data.js';
import { findUserById } from './helpers/data-managers.js';
import { validateUrl, validateText } from './helpers/validators.js';

const createPost = (userId, text, image) => {
  validateUrl(image, 'image url');
  validateText(text);

  const foundUser = findUserById(userId);

  if (!foundUser) throw new Error('User not found');

  let postId = 'user-1';
  const lastPost = posts[posts.length - 1];

  if (lastPost) postId = 'user-' + (parseInt(lastPost.id.slice(5)) + 1);

  posts.push({
    id: postId,
    author: userId,
    image,
    text,
    date: new Date(),
  });
};

export default createPost;
