import { users } from '../data';
import DEFAULT_AVATAR_URL from './helpers/global-variables';
import { validateId } from './helpers/validators';

const retrieveAvatar = (userId) => {
  validateId(userId, 'user id');
  let avatarUrl = DEFAULT_AVATAR_URL;
  users().forEach((user) => {
    if (user.id === userId) {
      avatarUrl = user.info.avatar;
    }
  });
  return avatarUrl;
};

export default retrieveAvatar;
