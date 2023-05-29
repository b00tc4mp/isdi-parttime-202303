import { users } from "../data.js";
import { userExist } from "./helpers/data-manager.js"

export function addUser(name, email, password) {

    if (userExist(email) !== -1) {
        throw new Error("El usuario ya existe");
    }

    let id = 'user-1';

    const lastUser = users[users.length - 1];

    if (lastUser) {
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1);
    }

    users.push({
        id: id,
        name: name,
        email: email,
        password: password
    });
    return true;
}