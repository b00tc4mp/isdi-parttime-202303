import { posts, savePost } from '../data';
import { getPostById } from './helpers/data-managers';
import { validateId } from './helpers/validators';
import retrieveUser from './retrieve-user';

const handleLikes = (postId, userId) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');

  const post = getPostById(postId),
    user = retrieveUser(userId),
    userIndex = post.likesUsers.indexOf(user.name);

  if (!post) throw new Error('post doesnt exist');

  if (userIndex === -1) {
    post.likesUsers.push(user.name);
  } else {
    post.likesUsers.splice(userIndex, 1);
  }

  post.likesCount = post.likesUsers.length;
  savePost();

  return post;
};

export default handleLikes;
