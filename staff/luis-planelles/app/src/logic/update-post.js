import { findUserById, getPostById } from './helpers/data-managers';
import { validateId, validateUrl, validateText } from './helpers/validators';
import { savePost } from '../data';

const updatePost = (userId, postId, postImage, postText) => {
  validateUrl(postImage, 'image url');
  validateText(postText);
  validateId(userId);
  validateId(postId);

  const foundUser = findUserById(userId);

  if (!foundUser) throw new Error(`user with id ${userId} not found`);

  let postUser = getPostById(postId);

  if (!postUser) throw new Error(`post with id ${postId} not found`);

  if (postUser.author !== userId)
    throw new Error(
      `post with id ${postId} does not belong to user with id ${userId}`
    );

  postUser.image = postImage;
  postUser.text = postText;
  postUser.date = new Date();
  postUser.editDate = new Date();

  savePost();
};

export default updatePost;
