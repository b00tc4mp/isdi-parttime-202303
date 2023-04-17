class User {
    name;
    email;
    password;

    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    saludar() {
        console.log('Hola, soy ' + this.name);
    }

    rango() {
        console.log('Soy usuario');
    }
}

const user1 = new User('Antonio', 'a@a.com', 'aTitelavoyadecir23!');

user1.saludar();

user1.rango();

console.log(user1.email);

console.log(user1);


class Administrador extends User {

    constructor(name, email, password, category) {
        super(name, email, password);
        this.category = category;
    }

    rango() {
        console.log('Soy Administrador');
    }
}

const user2 = new Administrador('Maria','m@m.com','123456','superior');

user2.saludar(); //Está usando la de User, heredada

user2.rango(); //Está usando la redefinida en Administrador

console.log(user2.email);

console.log(user2);



class Users {
    users;

    constructor(users) {
        if (users === undefined) {
            this.users = [];
        }
        else {
            this.users = users;
        }
    }

    addUser = (name, email, password) => {
        this.users.push(new User(name, email, password));
    }
}

let demoUsers = [];
demoUsers.push(new User('Wendy Darling', 'wendy@darling.com', '123123123'));
demoUsers.push(new User('Peter Pan', 'peter@pan.com', '123123123'));
demoUsers.push(new User('Pepito Grillo', 'pepito@grillo.com', '123123123'));
let appUsers = new Users(demoUsers);

let activeUser;

//Logic

function userExist(email) {
    let userPosition = null;
    for (let i = 0; i < appUsers.users.length; i++) {
        let user = appUsers.users[i];
        if (user.email === email) {
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

function addUser(name, email, password) {

    if (userExist(email) !== -1) {
        throw new Error("El usuario ya existe");
    }

    appUsers.addUser(name, email, password);
    return true;
}

function authenticateUser(email, password) {

    let userPosition = userExist(email);

    if (userPosition === -1) {
        throw new Error("El usuario no existe");
    }

    if (appUsers.users[userPosition].password !== password) {
        throw new Error("Contraseña incorrecta");
    }
    activeUser = { name: appUsers.users[userPosition].name, email: appUsers.users[userPosition].email };
}

function getInitials(name) {
    return name.split(" ").map((n) => n[0]).join("");
}

function changePassword(oldpass, newpass, passcheck) {
    let userPosition = userExist(activeUser.email);
    if (userPosition === -1) {
        throw new Error("El usuario no existe");
    }
    if (oldpass !== appUsers.users[userPosition].password) {
        throw new Error("Contraseña antigua incorrecta");
    }

    if (newpass !== passcheck) {
        throw new Error("La nueva contraseña no coincide con su comprobación");
    }

    appUsers.users[userExist(activeUser.email)].setPassword(newpass);
}

function changeMail(oldmail, newmail, mailcheck) {
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

    appUsers.users[userExist(activeUser.email)].setEmail(newmail);
    activeUser.email = newmail;
}