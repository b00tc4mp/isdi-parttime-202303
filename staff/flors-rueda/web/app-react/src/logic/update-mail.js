import { saveUser } from '../data/data-managers';
import users from '../data/users';
import { validateMail, validateUserID } from '../data/validators-users';

export const updateMail = (mail, userId) => {
    validateUserID(userId);
    validateMail(mail);
    const _users = users();
    const _user = _users.filter((user) => { if (user.id === userId) return user })[0];
    _user.mail = mail;
    saveUser(_user);
};