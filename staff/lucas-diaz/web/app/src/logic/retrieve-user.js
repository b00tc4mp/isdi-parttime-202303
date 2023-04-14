import { validateId } from "./helpers/validators";
import { findUserById } from "./helpers/data-managers";


// NOS DA EL USER SIN PASSWORD NI EMAIL , PARA ELLO LO HACEMOS CON UN FIND(() => {})

export default function retrieveUser (userId) {
    validateId(userId);
    let foundUser = findUserById(userId);

    if (!foundUser) throw new Error ("User not found");

    foundUser = {
        name: foundUser.name,
        avatar: foundUser.avatar,
    }

    return foundUser;
}