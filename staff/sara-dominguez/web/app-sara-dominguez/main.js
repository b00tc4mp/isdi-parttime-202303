var registerPage= document.querySelector('.register')
var loginPage= document.querySelector('.login')
var homePage= document.querySelector('.home')
 var authenticateEmail // es util porque nos serviran los datos para el cambio de sesion...

//REGISTER PAGE


// capture datas Register form
registerPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    var name = registerPage.querySelector('input[name=name]').value
    var email = registerPage.querySelector('input[name=email]').value
    var password = registerPage.querySelector('input[name=password]').value

    var result = registerUser(name,email,password)

    if (result === false){
        alert('exist')
        console.log(result)
    }else{
    registerPage.classList.add('off')
    loginPage.classList.remove('off')
    }
})


// LOGIN PAGE


//capture datas Login form
loginPage.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault()

    var email = loginPage.querySelector('input[name=email]').value
    var password = loginPage.querySelector('input[name=password]').value

    var result = authenticateUser(email,password)

    if(result === false){
        alert('wrong email or password')
    }else{
        authenticateEmail = email

        var foundUser = retrieveUser(email)

        //TODO lookup user by email --> founUser

       
        homePage.querySelector('h6').innerText = `Hello, ${foundUser.name}`
        loginPage.classList.add('off')
        homePage.classList.remove('off')
       

    }

        
    }
)



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


//HOME PAGE


//Menu my Profile

// configurate home--button myprofile--con anchor

homePage.querySelector('.home-menu').querySelector('a').addEventListener('click',function(event){
    event.preventDefault()

    homePage.querySelector('.home-menu').querySelector('.home-profile-edit').classList.remove('off')
})

//configurate home--button--update password --con anchor

homePage.querySelector('.home-profile-edit').querySelector('a').addEventListener('click',function(event){
    event.preventDefault()

    homePage.querySelector('.home-profile-edit').querySelector('.home-profile-edit-password').classList.remove('off')
})

//configurate form to chante password

//input 1 --password actual--dato que recojo del form
//input 2 --new password--dato que recojo del form
//input 3 --confirm new password--dato que recojo del form


homePage.querySelector('.home-profile-edit').querySelector('.home-profile-edit-password').addEventListener('submit',function(event){
    event.preventDefault()

    var password= homePage.querySelector('.home-profile-edit-password').querySelector('input[name=password]').value

    var userNewPassword = homePage.querySelector('.home-profile-edit-password').querySelector('input[name=new-password]').value
    
    var userConfirmNewPassword = homePage.querySelector('.home-profile-edit-password').querySelector('input[name=confirm-new-password]').value

    var result = validatedNewPassword (authenticateEmail, password, userNewPassword, userConfirmNewPassword)

    if(result === false){
        alert('Validate New password failed')
    }else{
        alert('your new passport has been validated')
    }
})






