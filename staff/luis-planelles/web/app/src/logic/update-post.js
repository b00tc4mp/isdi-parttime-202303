import { findUserById, getPostById } from './helpers/data-managers';
import { validateId, validateUrl, validateText } from './helpers/validators';
import { savePost } from '../data';

const updatePost = (userId, postId, postImage, postText) => {
  validateUrl(postImage, 'image url');
  validateText(postText);
  validateId(userId);

  const foundUser = findUserById(userId);

  if (!foundUser) throw new Error('user not found');

  let postUser = getPostById(postId);

  if (!postUser) throw new Error('post not found');

  postUser.image = postImage;
  postUser.text = postText;
  postUser.date = new Date();
  postUser.edit = true;

  savePost();
};

export default updatePost;
