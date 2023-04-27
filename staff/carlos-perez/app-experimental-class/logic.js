import {appUsers} from "./data.js";

export let activeUser;

export function resetActiveUser(){
    activeUser=null;
}

function userExist(email) {
    let userPosition = null;
    for (let i = 0; i < appUsers.users.length; i++) {
        let user = appUsers.users[i];
        if (user.getEmail === email) {
            userPosition = i;
            break;
        }
    }
    if (userPosition !== null) {
        return userPosition;
    }
    else {
        return -1;
    }
}

function userExistById(id){
    let userPosition = null;
    for (let i = 0; i < appUsers.users.length; i++) {
        let user = appUsers.users[i];
        if (user.getId === id) {
            userPosition = i;
            break;
        }
    }
    if (userPosition !== null) {
        return userPosition;
    }
    else {
        return -1;
    }
}

export function userEmailById(id){
    const userPosition = userExistById(id);
    return appUsers.users[userPosition].getEmail;
}

export function addUser(name, email, password) {

    if (userExist(email) !== -1) {
        throw new Error("El usuario ya existe");
    }

    appUsers.addUser(name, email, password);
    return true;
}

export function authenticateUser(email, password) {

    let userPosition = userExist(email);

    if (userPosition === -1) {
        throw new Error("El usuario no existe");
    }

    if (appUsers.users[userPosition].getPassword !== password) {
        throw new Error("Contraseña incorrecta");
    }
    activeUser = { name: appUsers.users[userPosition].getName, id: appUsers.users[userPosition].getId };
}

export function getInitials(name) {
    return name.split(" ").map((n) => n[0]).join("");
}

export function changePassword(oldpass, newpass, passcheck) {
    let userPosition = userExistById(activeUser.id);
    if (userPosition === -1) {
        throw new Error("El usuario no existe");
    }
    if (oldpass !== appUsers.users[userPosition].password) {
        throw new Error("Contraseña antigua incorrecta");
    }

    if (newpass !== passcheck) {
        throw new Error("La nueva contraseña no coincide con su comprobación");
    }

    appUsers.users[userExistById(activeUser.id)].setPassword(newpass);
}

export function changeMail(oldmail, newmail, mailcheck) {
    let userPosition = userExist(activeUser.email);
    if (userPosition === -1) {
        throw new Error("El usuario no existe");
    }

    if (oldmail !== appUsers.users[userPosition].email) {
        throw new Error("Correo antiguo incorrecto");
    }

    if (newmail !== mailcheck) {
        throw new Error("El nuevo correo no corresponde con su comprobación");
    }

    appUsers.users[userExistById(activeUser.id)].setEmail(newmail);
}