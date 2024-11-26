import { validatePasswordsChanges, validateId } from "./helpers/validators.js";
import { users, saveUsers} from "../data.js";
import { findUserById } from "./helpers/dataManagers.js";


export default function updateUserPassword(authenticatedUserId, password, newPassword, newPasswordConfirm) {
    validatePasswordsChanges(password,newPassword, newPasswordConfirm);
    validateId( authenticatedUserId)

    const _users = users()

    const currentUser =  findUserById(authenticatedUserId);
    const currentUserIndex = _users.findIndex(user => user.id === authenticatedUserId);

    if (currentUser.password !== password) throw new Error("typed password isn't actual password user's value")
    if (password === newPassword) throw new Error("Password is equal than new password")
    if (newPassword !== newPasswordConfirm) throw new Error("New password and new password confirmation are not the same")

    _users[currentUserIndex].password = newPassword;

    saveUsers(_users);

}
