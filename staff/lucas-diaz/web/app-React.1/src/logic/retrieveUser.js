import { validateId } from "./helpers/validators";
import { findUserById } from "./helpers/dataManagers";


// NOS DA EL USER SIN PASSWORD NI EMAIL , PARA ELLO LO HACEMOS CON UN FIND(() => {})

export default function retrieveUser (userId) {
    validateId(userId);
    let user = findUserById(userId);

    if (!user) throw new Error ("User not found");

    user = {
        name: user.name,
        avatar: user.avatar,
    }

    return user;
}