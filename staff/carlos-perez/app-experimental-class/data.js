//Data

export class User {
    #id;
    #name;
    #email;
    #password;

    constructor(id, name, email, password) {

        if(id!= undefined){
        this.#id = id;
        this.#name = name;
        this.#email = email;
        this.#password = password;
        }
        else{
            throw new Error("id es un campo obligatorio");
        }
    }

    get getId() {
        return this.#id;
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

    //set setId no tiene sentido, porque es PK, y no cambia una vez creado el objeto.

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

export class Users {
    users;
    admins = [];
    idCounter = 0;

    constructor(users) {
        if (users === undefined) {
            this.users = [];
        }
        else {
            this.users = users;
            this.idCounter = users.length-1;
        }
    }

    addUser = (name, email, password) => {
        this.users.push(new User(this.idCounter,name, email, password));
        this.idCounter++;
    }

    set setAdmin(admin) {
        this.admins.push(admin);
        addUser(admin.getName, admin.getEmail, admin.getPassword);
    }
}

export let appUsers = new Users();
appUsers.addUser('Wendy Darling', 'wendy@darling.com', '123123123');
appUsers.addUser('Peter Pan', 'peter@pan.com', '123123123');
appUsers.addUser('Pepito Grillo', 'pepito@grillo.com', '123123123');
console.log(appUsers);