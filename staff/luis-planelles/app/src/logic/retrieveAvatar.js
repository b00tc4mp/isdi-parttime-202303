import { users } from '../data';
import DEFAULT_AVATAR_URL from './helpers/global-variables';

const retrieveAvatar = (userId) => {
  let avatarUrl = DEFAULT_AVATAR_URL;
  users().forEach((user) => {
    if (user.id === userId) {
      avatarUrl = user.info.avatar;
    }
  });
  return avatarUrl;
};

export default retrieveAvatar;
