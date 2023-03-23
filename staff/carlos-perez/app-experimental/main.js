//Data

class User{
    name;
    email;
    password;
    isAdmin;

    constructor(name, email, password, isAdmin){
        this.name=name;
        this.email=email;
        this.password=password;
        this.isAdmin=isAdmin;
    }

    get name(){
        return this.name;
    }

    get email(){
        return this.email;
    }

    get password(){
        return this.password;
    }

    get isAdmin(){
        return this.isAdmin;
    }

    setName(name){
        this.name=name;
    }

    setEmail(email){
        this.email=email;
    }

    setPassword(password){
        this.password=password;
    }

    setIsAdmin(isAdmin){
        this.isAdmin=isAdmin;
    }
}

let prueba=new User('carlos perez','carlos@perez.com','123456',true);
console.log(prueba);
prueba.setIsAdmin(false);
console.log(prueba);

class Users{
    users;

    constructor(users){
        this.users=users;
    }

    get users(){
        return this.users;
    }

    addUser=(name,email,password,isAdmin) =>{
        this.users.push(new User(name, email,password,isAdmin));
    }
}

//Logic

//Presentation

var registerPage = document.querySelector('.registro');
var loginPage= document.querySelector('.login');
var homePage= document.querySelector('.home');

let appUsers;

function initiate(){
    loginPage.classList.add('off');
    homePage.classList.add('off');
    let demoUsers=[];
    demoUsers.push(new User('Wendy Darling','wendy@darling.com','123123123',true));
    demoUsers.push(new User('Peter Pan','peter@pan.com','123123123',false));
    demoUsers.push(new User('Pepito Grillo','pepito@grillo.com','123123123',false));
    appUsers=new Users(demoUsers);
}

initiate();

function userExist(email){
    let userPosition=null;
    for(let i=0; i<appUsers.users.length; i++){
        let user=appUsers.users[i];
        if(user.email===email){
            userPosition=i;
            break;
        }
    }
    if(userPosition !== null){
        return userPosition;
    }
    else{
        return -1;
    }
}

document.querySelector('.formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    var name=registerPage.querySelector('input[id=nombre]').value;
    var email=registerPage.querySelector('input[type=email]').value;
    var password=registerPage.querySelector('input[type=password]').value;

    let userPosition=userExist(email);

    if(userPosition === -1){
        appUsers.addUser(name, email, password,false);
        registerPage.classList.add('off');
        loginPage.classList.remove('off');
    }
    else{
        alert("Ha habido un error en el registro");
    }

    
})
document.querySelector('.formulario-login').addEventListener('submit', function(event) {
    event.preventDefault();

    var email=loginPage.querySelector('input[type=email]').value;
    var password=loginPage.querySelector('input[type=password]').value;
    
    let userPosition=userExist(email);

    if(userPosition !== -1 && appUsers.users[userPosition].password===password){
        loginPage.classList.add('off');
        homePage.classList.remove('off');
    }
    else{
        alert("Usuario o contraseña incorrectos");
    }

    
})

registerPage.querySelector('a').addEventListener('click', function(event){
    event.preventDefault();
    registerPage.classList.add('off');
    loginPage.classList.remove('off');
})

loginPage.querySelector('a').addEventListener('click', function(event){
    event.preventDefault();
    loginPage.classList.add('off');
    registerPage.classList.remove('off');
})