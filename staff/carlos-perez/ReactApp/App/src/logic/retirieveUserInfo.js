import { users } from "../data.js";
import { userExistById } from "./authenticateUser.js"

export function retrieveMail(activeUser){
    let userPosition = userExistById(activeUser.id);
    if (userPosition === -1) {
        throw new Error("El usuario no existe");
     }

     return users[userPosition].email;
}

export function getInitials(name) {
    return name.split(" ").map((n) => n[0]).join("");
}