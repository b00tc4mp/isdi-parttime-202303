document.querySelector('.registration').querySelector('.centered-containers').querySelector('form').addEventListener('submit', function(event){
    event.preventDefault()
   
    document.querySelector('.registration').classList.add('off')
    document.querySelector('.login').classList.remove('off')
})

document.querySelector('.login .centered-containers form').addEventListener('submit', function(event){
    event.preventDefault()

    document.querySelector('.login').classList.add('off')
    document.querySelector('.homepage').classList.remove('off')
})
