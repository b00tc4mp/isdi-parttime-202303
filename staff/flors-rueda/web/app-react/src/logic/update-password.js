import { saveUser } from '../data/data-managers';
import users from '../data/users';
import { validateNewPassword, validatePasswordChange, validateUserID, validateUserPassword } from '../data/validators-users';

export const updatePassword = (id, oldPassword, repeatPassword, newPassword) => {
    validateNewPassword(newPassword, repeatPassword);
    validateUserID(id);
    validateUserPassword(id, oldPassword);
    validatePasswordChange(id, newPassword);
    const _users = users()
    const _user = _users.filter((user) => { if (user.id === userId) return user })[0];
    _user.password = newPassword;
    saveUser(_user);
};