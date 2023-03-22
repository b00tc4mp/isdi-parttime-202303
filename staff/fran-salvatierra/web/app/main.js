document.querySelector('.register').querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    // TODO how to get all data from inputs
    console.log('hello sumbit')

    document.querySelector('.register').classList.add('off')
    document.querySelector('.login').classList.remove('off')
})

document.querySelector('.login').querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    // TODO how to get all data from inputs
    console.log('hello sumbit')

    document.querySelector('.login').classList.add('off')
    document.querySelector('.home').classList.remove('off')
})
