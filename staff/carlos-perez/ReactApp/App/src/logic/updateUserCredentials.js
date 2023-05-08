import { users } from "../data.js";
import { userExistById } from "./authenticateUser.js"


export function changePassword(oldpass, newpass, passcheck) {
    let userPosition = userExistById(activeUser.id);
    if (userPosition === -1) {
       throw new Error("El usuario no existe");
    }
    if(oldpass !== users[userPosition].password){
        throw new Error("Contraseña antigua incorrecta");
    }

    if(newpass !== passcheck)
    {
        throw new Error("La nueva contraseña no coincide con su comprobación");
    }

    users[userPosition].password = newpass;
}

export function changeMail(oldmail, newmail, mailcheck) {
    let userPosition = userExistById(activeUser.id);
    if (userPosition === -1) {
       throw new Error("El usuario no existe");
    }
   
    if(oldmail !== users[userPosition].email){
        throw new Error("Correo antiguo incorrecto");
    }

    if(newmail !== mailcheck){
        throw new Error("El nuevo correo no corresponde con su comprobación");
    }

    users[userPosition].email = newmail;
}