/*Add form functions*/

function initiate(){
    document.querySelector('.login').classList.add('off');
    document.querySelector('.home').classList.add('off');
}

initiate();

document.querySelector('.formulario').addEventListener('submit', function(event) {
    event.preventDefault();
    document.querySelector('.registro').classList.add('off');
    document.querySelector('.login').classList.remove('off');
})
document.querySelector('.formulario-login').addEventListener('submit', function(event) {
    event.preventDefault();
    document.querySelector('.login').classList.add('off');
    document.querySelector('.home').classList.remove('off');
})