import { users, posts } from "./data.mjs";

export function userExist(email) {
    let userPosition = null;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (user.email === email) {
            userPosition = i;
            break;
        }
    }

    if (userPosition === null) {
        return -1;
    }

    return userPosition;
}

export function userExistById(id){
    let userPosition = null;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (user.id === id) {
            userPosition = i;
            break;
        }
    }

    if (userPosition === null) {
        return -1;
    }

    return userPosition;
}

export function addUser(name, email, password) {

    if (userExist(email) !== -1) {
        throw new Error("El usuario ya existe");
    }
    
    let id = 'user-1';

    const lastUser = users[users.length - 1];

    if (lastUser){
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

export function getInitials(name) {
    return name.split(" ").map((n) => n[0]).join("");
}

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

export function retrieveMail(activeUser){
    let userPosition = userExistById(activeUser.id);
    if (userPosition === -1) {
        throw new Error("El usuario no existe");
     }

     return users[userPosition].email;
}