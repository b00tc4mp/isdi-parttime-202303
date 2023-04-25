import { savePost } from '../data';
import { findPostById, findUserById } from './helpers/data-managers';
import { validateId } from './helpers/validators';

const toggleLikesPost = (postId, userId) => {
  validateId(userId, 'toggleLikesPost: user id');
  validateId(postId, 'toggleLikesPost: post id');

  const user = findUserById(userId);
  if (!user) throw new Error(`user id: ${userId} not found`);

  const post = findPostById(postId);
  if (!post) throw new Error(`post id: ${postId} not found`);

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

  savePost(post);

  return post;
};

export default toggleLikesPost;
