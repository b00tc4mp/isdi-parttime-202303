class User {
    #name;
    #email;
    #password;

    constructor(name, email, password) {
        this.#name = name;
        this.#email = email;
        this.#password = password;
    }

    get getName() {
        return this.#name;
    }

    get getEmail() {
        return this.#email;
    }

    get getPassword() {
        return this.#password;
    }

    set setName(name) {
        this.#name = name;
    }

    set setEmail(email) {
        this.#email = email;
    }

    set setPassword(password) {
        this.#password = password;
    }
}

const user1 = new User('John Appleseed', 'm@m.com', 'm1m2');

console.log(user1.name); //undefined
console.log(user1.getName); //John Appleseed

class Administrator extends User {
    #level;

    constructor(name, email, password, level) {
        super(name, email, password);
        this.#level = level;
    }

    get getLevel() {
        return this.#level;
    }

    set setLevel(level) {
        this.#level = level;
    }
}

class Users {
    users;
    admins = [];

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

    set setAdmin(admin) {
        this.admins.push(admin);
        addUser(admin.getName, admin.getEmail, admin.getPassword);
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

function isAdmin(email) {
    let userPosition = null;
    for (let i = 0; i < appUsers.admins.length; i++) {
        let user = appUsers.admins[i];
        if (user.getEmail === email && user.getLevel === 'high') {
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

    if (appUsers.users[userPosition].getPassword !== password) {
        throw new Error("Contraseña incorrecta");
    }
    activeUser = { name: appUsers.users[userPosition].getName, email: appUsers.users[userPosition].getEmail };
}

function getInitials(name) {
    return name.split(" ").map((n) => n[0]).join("");
}

function changePassword(oldpass, newpass, passcheck) {
    let userPosition = userExist(activeUser.email);
    if (userPosition === -1) {
        throw new Error("El usuario no existe");
    }
    if (oldpass !== appUsers.users[userPosition].getPassword) {
        throw new Error("Contraseña antigua incorrecta");
    }

    if (newpass !== passcheck) {
        throw new Error("La nueva contraseña no coincide con su comprobación");
    }

    appUsers.users[userExist(activeUser.email)].setPassword = newpass;
}

function changeMail(oldmail, newmail, mailcheck) {
    let userPosition = userExist(activeUser.email);
    if (userPosition === -1) {
        throw new Error("El usuario no existe");
    }

    if (oldmail !== appUsers.users[userPosition].getEmail) {
        throw new Error("Correo antiguo incorrecto");
    }

    if (newmail !== mailcheck) {
        throw new Error("El nuevo correo no corresponde con su comprobación");
    }

    appUsers.users[userExist(activeUser.email)].setEmail = newmail;
    activeUser.email = newmail;
}

function deleteUser(activeUser, userToDelete) {
    if (isAdmin(activeUser.email)!==-1) {
        appUsers.users.splice(userExist(userToDelete.getEmail), 1);
    }
    else {
        throw new Error('No tienes autoridad para realizar esa operación');
    }
}

//Testing

console.log(userExist('wendy@darling.com')); //0
console.log(userExist('a@a.com')); //-1

addUser('John Appleseed', 'johnappleseed@icloud.com', '24011984');

authenticateUser('johnappleseed@icloud.com', '24011984');

console.log(appUsers.users[userExist(activeUser.email)].getPassword); //24011984

changePassword('24011984', '01041976', '01041976');

console.log(appUsers.users[userExist(activeUser.email)].getPassword); //01041976

console.log(appUsers.users[userExist(activeUser.email)].getEmail); //johnappleseed@icloud.com

changeMail('johnappleseed@icloud.com', 'ja@icloud.com', 'ja@icloud.com');

console.log(appUsers.users[userExist(activeUser.email)].getEmail); //ja@icloud.com

appUsers.setAdmin = new Administrator('Carlos', 'c@c.com', '123456', 'high');

console.log('Hay '+appUsers.users.length+' usuarios'); //5

try{
deleteUser(activeUser, 'wendy@darling.com');
}
catch(e){
    console.log(e.message);
}

//Debe dar error, porque el usuario activo no es un administrador

console.log('Hay '+appUsers.users.length+' usuarios'); //5

authenticateUser('c@c.com', '123456'); //El usuario activo es ahora un administrador

console.log('Hay '+appUsers.users.length+' usuarios'); //5

try{
deleteUser(activeUser, 'wendy@darling.com');
}
catch(e){
    console.log(e.message);
}

console.log('Hay '+appUsers.users.length+' usuarios'); //4
