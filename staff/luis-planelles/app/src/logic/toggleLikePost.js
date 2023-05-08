import { savePost } from '../data';
import { findPostById, findUserById } from './helpers/data-managers';
import { validateId } from './helpers/validators';

const handlePostLikeUSers = (post, user) => {
  if (!post.likes) {
    post.likes = [user.info.name];
  } else {
    const userIndex = post.likes.indexOf(user.info.name);

    if (userIndex < 0) {
      post.likes.push(user.info.name);
    } else {
      post.likes.splice(userIndex, 1);

      if (!post.likes.length) {
        delete post.likes;
      }
    }
  }
  return post;
};

const toggleLikePost = (postId, userId) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');

  const foundUser = findUserById(userId);
  if (!foundUser) throw new Error(`user id: ${userId} not found`);

  const foundPost = findPostById(postId);
  if (!foundPost) throw new Error(`post id: ${postId} not found`);

  const updatedPost = handlePostLikeUSers(foundPost, foundUser);
  savePost(updatedPost);

  return updatedPost;
};

export default toggleLikePost;
