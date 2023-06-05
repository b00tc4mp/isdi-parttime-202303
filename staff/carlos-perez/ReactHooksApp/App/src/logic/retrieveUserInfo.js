import { users } from "../data.js";
import {userExistById} from "./helpers/data-manager.js"

export function retrieveName(activeUser){
    let userPosition = userExistById(activeUser.id);
    if (userPosition === -1) {
        throw new Error("El usuario no existe");
     }

     return users[userPosition].name;
}

export function retrieveMail(activeUser){
    let userPosition = userExistById(activeUser.id);
    if (userPosition === -1) {
        throw new Error("El usuario no existe");
     }

     return users[userPosition].email;
}

export function retrieveMailById(userId){
    let userPosition = userExistById(userId);
    if (userPosition === -1) {
        throw new Error("El usuario no existe");
     }

     return users[userPosition].email;
}

export function getInitials(name) {
    return name.split(" ").map((n) => n[0]).join("");
}