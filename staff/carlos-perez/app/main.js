var registerPage = document.querySelector('.registro');
var loginPage= document.querySelector('.login');
var homePage= document.querySelector('.home');

function initiate(){
    loginPage.classList.add('off');
    homePage.classList.add('off');
}

initiate();

document.querySelector('.formulario').addEventListener('submit', function(event) {
    event.preventDefault();
    registerPage.classList.add('off');
    loginPage.classList.remove('off');
})
document.querySelector('.formulario-login').addEventListener('submit', function(event) {
    event.preventDefault();
    loginPage.classList.add('off');
    homePage.classList.remove('off');
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