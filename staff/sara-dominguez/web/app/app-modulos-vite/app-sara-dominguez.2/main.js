var registerPage= document.querySelector('.register')
var loginPage= document.querySelector('.login')
var homePage= document.querySelector('.home')



// capture datas Register form
registerPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    var name = registerPage.querySelector('input[name=name]').value
    var email = registerPage.querySelector('input[name=email]').value
    var password = registerPage.querySelector('input[name=password]').value

    var result = registerUser(name,email,password)

    if (result === false){
        alert('exist')
    }else{
    registerPage.classList.add('off')
    loginPage.classList.remove('off')
    }
})

//capture datas Login form
loginPage.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault()

    var email = loginPage.querySelector('input[name=email]').value
    var password = loginPage.querySelector('input[name=password]').value

    var result = authenticateUser(email,password)

    if(result === false){
        alert('wrong email or password')
        console.log(result)

    }else{
        authenticateEmail = email

        loginPage.classList.add('off')
        homePage.classList.remove('off')
       
    }
})

   

    

//configurate anchor <a> Login

loginPage.querySelector('a').addEventListener('click', function(event){
    event.preventDefault()

    
    loginPage.classList.add('off')
    registerPage.classList.remove('off')
})

//configurate anchor <a> register

registerPage.querySelector('a').addEventListener('click', function(event){
    event.preventDefault()

   registerPage.classList.add('off')
    loginPage.classList.remove('off')
})

