// data

var users = []

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

// logic

// presentation

const registerPage = document.querySelector(".register");
const logInPage = document.querySelector(".login")
const homePage = document.querySelector(".home");
const registerForm = document.querySelector(".register form");
const logInForm = document.querySelector(".login form");
const registerFormAnchor = document.querySelector(".login .register-anchor");
const successRegisterAdivice = document.querySelector(".success-advice-p");
const failRegisterAdvice = document.querySelector(".register .fail-advice-p");
const successLogInAdvice = document.querySelector(".login .fail-advice-p")


registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
    //! ESTABA USANDO MAL EL SELECTOR DE ATRIBUTO 
    var temporalUser = {
        name: registerPage.querySelector("input[type=text]").value,
        email: registerPage.querySelector("input[type=email]").value,
        password: registerPage.querySelector("input[type=password]").value
    }
    var checkIfUserExist = users.find(user => user.email === temporalUser.email);

    /* find coge la primera coincidencia y devuelve un array, podemos considerarlo como truthy, si no lo encuentra En JavaScript, se considera que undefined, junto con null, 0, NaN, '' (cadena vacía) y false, son valores falsy, es decir, valores que se evalúan como falso en un contexto booleano. entonces aqui checkeamos precisamente eso, si no esta en ese array, si devuelve un falsy, porque es lo mismo que if(!checkIfUserExist === true) 
    
    meterse en la cabeza 

    let valor = true; 

    if (valor){
        console.log("hola")
    }

    if (valor === true){
        console.log("hola")
    }
    */

    if(!checkIfUserExist){
        users.push(temporalUser);
        registerPage.classList.add("off");
        logInPage.classList.remove("off");
        successRegisterAdivice.classList.remove("off");
        setTimeout(() => {
            successRegisterAdivice.classList.add("off")
        },2000);
    } else {
        failRegisterAdvice.classList.remove("off");
        setTimeout(() => {
            failRegisterAdvice.classList.add("off")
        }, 3000);
        registerPage.querySelector("input[type=text]").value = ""
        registerPage.querySelector("input[type=email]").value = ""
        registerPage.querySelector("input[type=password]").value = ""
    }
})

logInForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var email = logInPage.querySelector('input[name=email]').value
    var password = logInPage.querySelector('input[name=password]').value
    var foundUser;
    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        if (user.email === email) {
            foundUser = user
            break
        }
    }
    if (foundUser !== undefined && foundUser.password === password) {
        logInPage.classList.add("off");
        homePage.classList.remove("off");
    } else {
        successLogInAdvice.classList.remove("off");

        setTimeout(() => {
            successLogInAdvice.classList.add("off")
        }, 3000);
    }
})

registerFormAnchor.addEventListener("click", function (event){
    event.preventDefault();
    logInPage.classList.add("off");
    registerPage.classList.remove("off");
})
