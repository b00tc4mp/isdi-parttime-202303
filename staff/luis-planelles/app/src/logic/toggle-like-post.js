import { savePost } from '../data';
import { findPostById, findUserById } from './helpers/data-managers';
import { validateId } from './helpers/validators';

const handlePostLikeUSers = (user, post) => {
  if (!post.likesUsers) {
    post.likesUsers = [user.info.name];
  } else {
    const userIndex = post.likesUsers.indexOf(user.info.name);

    if (userIndex < 0) {
      post.likesUsers.push(user.info.name);
    } else {
      post.likesUsers.splice(userIndex, 1);

      if (!post.likesUsers.length) {
        delete post.likesUsers;
      }
    }
  }
  return post;
};

const toggleLikesPost = (postId, userId) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');

  const foundUser = findUserById(userId);
  if (!user) throw new Error(`user id: ${userId} not found`);

  const foundPost = findPostById(postId);
  if (!post) throw new Error(`post id: ${postId} not found`);

  const updatedPost = handlePostLikeUSers(foundUser, foundPost);
  savePost(updatedPost);

  return updatedPost;
};

export default toggleLikesPost;
