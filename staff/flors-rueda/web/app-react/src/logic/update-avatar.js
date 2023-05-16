import { saveUser } from '../data/data-managers';
import users from '../data/users';
import { validateAvatarUrl, validateUserID } from '../data/validators-users';

export const updateAvatar = (random, newSrc, userId) => {
    validateUserID(userId);
    if (!random) validateAvatarUrl(newSrc);
    const _users = users();
    const _user = _users.filter((user) => { if (user.id === userId) return user })[0];
    _user.avatar.random = random;
    _user.avatar.src = newSrc;
    saveUser(_user);
};