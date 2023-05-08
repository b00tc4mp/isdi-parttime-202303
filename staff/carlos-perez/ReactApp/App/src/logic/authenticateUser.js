import {userExist} from "./helpers/data-manager"

export function authenticateUser(email, password) {
    
    let userPosition = userExist(email);

    if(userPosition === -1){
        throw new Error("El usuario no existe");
    }

    if (users[userPosition].password !== password) {
        throw new Error("Contraseña incorrecta");
    }
    return { name: users[userPosition].name, id: users[userPosition].id };
}