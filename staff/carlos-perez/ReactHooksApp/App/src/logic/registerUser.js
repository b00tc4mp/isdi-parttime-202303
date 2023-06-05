import { users, saveUsers } from "../data.js";
import { userExist } from "./helpers/data-manager.js"

export function addUser(name, email, password) {

    if (userExist(email) !== -1) {
        throw new Error("El usuario ya existe");
    }

    let id = 'user-1';

    const _users = users();

    const lastUser = users[users.length - 1];

    if (lastUser) {
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1);
    }

    const user = {
        id,
        name,
        email,
        password
    }

    _users.push(user)

    saveUsers(_users)
    return true;
}