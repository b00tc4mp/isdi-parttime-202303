import { savePost } from '../data';
import { findPostById, findUserById } from './helpers/data-managers';
import { validateId, validateText, validateUrl } from './helpers/validators';

const updatePost = (userId, postId, postImage, postText) => {
  validateUrl(postImage, 'image url');
  validateText(postText, 'post text');
  validateId(userId, 'post user id');
  validateId(postId, 'post id');

  const foundUser = findUserById(userId);

  if (!foundUser) throw new Error(`user id not found`);

  let postUser = findPostById(postId);

  if (!postUser) throw new Error(`post id not found`);

  if (postUser.author !== userId)
    throw new Error(`post author id dont match with request user id`);

  postUser.image = postImage;
  postUser.text = postText;
  postUser.date = new Date();
  postUser.editDate = new Date();

  savePost(postUser);
};

export default updatePost;
