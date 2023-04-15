import { posts, savePost } from '../data.js';
import { findUserById } from './helpers/data-managers.js';
import { validateUrl, validateText, validateId } from './helpers/validators.js';

const createPost = (userId, postImage, postText) => {
  validateUrl(postImage, 'image url');
  validateText(postText);
  validateId(userId);

  const foundUser = findUserById(userId);

  if (!foundUser) throw new Error('User not found');

  let postId = 'post-1';
  const lastPost = posts[posts.length - 1];

  if (lastPost) postId = 'post-' + (parseInt(lastPost.id.slice(5)) + 1);

  posts.push({
    id: postId,
    author: userId,
    authorName: foundUser.info.name,
    image: postImage,
    text: postText,
    likesCount: '',
    likesUsers: [],
    date: new Date(),
  });

  savePost();
};

export default createPost;
