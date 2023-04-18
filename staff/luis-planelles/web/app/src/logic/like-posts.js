import { savePost } from '../data';
import { getPostById } from './helpers/data-managers';
import { validateId } from './helpers/validators';
import retrieveUser from './retrieve-user';

const handleLikes = (postId, userId) => {
  validateId(userId);
  validateId(postId);

  const post = getPostById(postId),
    user = retrieveUser(userId),
    userIndex = post.likesUsers.indexOf(user.name);

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
