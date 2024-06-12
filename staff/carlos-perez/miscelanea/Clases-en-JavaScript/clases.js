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