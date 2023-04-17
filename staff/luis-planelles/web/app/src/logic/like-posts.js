import { savePost } from '../data';
import { getPostById } from './helpers/data-managers';
import { validateId } from './helpers/validators';
import retrieveUser from './retrieve-user';

const handleLikes = (postId, userId) => {
  validateId(userId);
  validateId(postId);

  const post = getPostById(postId),
    user = retrieveUser(userId);

  if (!post.likesUsers.includes(user.name)) {
    post.likesUsers.push(user.name);
  } else {
    const index = post.likesUsers.indexOf(user.name);
    if (index > -1) {
      post.likesUsers.splice(index, 1);
    }
  }

  post.likesCount = post.likesUsers.length;
  savePost();

  return post;
};

export default handleLikes;
