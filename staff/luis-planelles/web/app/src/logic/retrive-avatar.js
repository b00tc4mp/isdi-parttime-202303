import { users } from '../data';
import DEFAULT_AVATAR_URL from './helpers/global-variables';

const retrieveAvatar = (postAuthor) => {
  for (const user of users) {
    if (user.id === postAuthor) {
      return user.info.avatar;
    }
  }
  return DEFAULT_AVATAR_URL;
};

export default retrieveAvatar;
