let userName = '';

document.querySelector('.register').querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    document.querySelector('.register').classList.add('off')

    document.querySelector('.login').classList.remove('off')

    userName = document.querySelector('.user-input').value;
})

document.querySelector('.login').querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    document.querySelector('.login').classList.add('off')

    document.querySelector('.home').classList.remove('off')
})