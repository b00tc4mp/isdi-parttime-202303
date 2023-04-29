import { users } from '../data';
import DEFAULT_AVATAR_URL from './helpers/global-variables';

const retrieveAvatar = (postAuthor) => {
  let avatarUrl = DEFAULT_AVATAR_URL;
  users().forEach((user) => {
    if (user.id === postAuthor) {
      avatarUrl = user.info.avatar;
    }
  });
  return avatarUrl;
};

export default retrieveAvatar;
