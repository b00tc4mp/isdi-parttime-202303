

// capture datas Register form
document.querySelector('.register').querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    document.querySelector('.register').classList.add('off')
    document.querySelector('.login').classList.remove('off')
    
})

//capture datas Login form
document.querySelector('.login').querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault()

    document.querySelector('.login').classList.add('off')
    document.querySelector('.home').classList.remove('off')
})

//configurate anchor <a> Login

document.querySelector('.login').querySelector('a').addEventListener('click', function(event){
    event.preventDefault()

    document.querySelector('.login').classList.add('off')
    document.querySelector('.register').classList.remove('off')
})

//configurate anchor <a> Login

document.querySelector('.register').querySelector('a').addEventListener('click', function(event){
    event.preventDefault()

    document.querySelector('.register').classList.add('off')
    document.querySelector('.login').classList.remove('off')
})

