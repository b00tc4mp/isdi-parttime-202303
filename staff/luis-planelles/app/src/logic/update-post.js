import { findUserById, getPostById } from './helpers/data-managers';
import { validateId, validateUrl, validateText } from './helpers/validators';
import { savePost } from '../data';

const updatePost = (userId, postId, postImage, postText) => {
  validateUrl(postImage, 'image url');
  validateText(postText, 'post text');
  validateId(userId, 'post user id');
  validateId(postId, 'post id');

  const foundUser = findUserById(userId);

  if (!foundUser) throw new Error(`user id not found`);

  let postUser = getPostById(postId);

  if (!postUser) throw new Error(`post id not found`);

  if (postUser.author !== userId)
    throw new Error(`post author id dont match with request user id`);

  postUser.image = postImage;
  postUser.text = postText;
  postUser.date = new Date();
  postUser.editDate = new Date();

  savePost();
};

export default updatePost;
