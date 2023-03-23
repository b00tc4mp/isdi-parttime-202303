//Data

let users = [];

users.push({
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    password: '123123123'
})

users.push({
    name: 'Peter Pan',
    email: 'peter@pan.com',
    password: '123123123'
})

users.push({
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    password: '123123123'
})

//Logic

//Presentation

var registerPage = document.querySelector('.registro');
var loginPage= document.querySelector('.login');
var homePage= document.querySelector('.home');

function initiate(){
    loginPage.classList.add('off');
    homePage.classList.add('off');
}

initiate();

function userExist(email){
    let userPosition=null;
    for(let i=0; i<users.length; i++){
        let user=users[i];
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

function addUser(name,email,password){

    let userPosition=userExist(email);

    if(userPosition === -1){
        users.push({
            name: name,
            email: email,
            password: password
        });
        return true;
    }
    else{
       return false;
    }
    
}

document.querySelector('.formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    var name=registerPage.querySelector('input[id=nombre]').value;
    var email=registerPage.querySelector('input[type=email]').value;
    var password=registerPage.querySelector('input[type=password]').value;

    let result=addUser(name, email, password);

    if(result === true){
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

    if(userPosition !== -1 && users[userPosition].password===password){
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