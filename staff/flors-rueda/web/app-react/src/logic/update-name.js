import { saveUser } from '../data/data-managers';
import users from '../data/users';
import { validateName, validateUserID } from '../data/validators-users';

export const updateName = (name, userId) => {
    validateUserID(userId);
    validateName(name);
    const _users = users();
    const _user = _users.filter((user) => { if (user.id === userId) return user })[0];
    _user.name = name;
    saveUser(_user);
};