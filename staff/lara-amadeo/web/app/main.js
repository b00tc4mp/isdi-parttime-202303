var registrationPage = document.querySelector('.registration')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.homepage')

var users = [{username:'example',
                email:'example@example',
            password: 'example'}]



registrationPage.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault()
    
   var registrationName = registrationPage.querySelector('input[name=username]').value
   var registrationEmail = registrationPage.querySelector('input[name=email]').value
   var registrationPassword = registrationPage.querySelector('input[name=password]').value


//    var checkUserExists = (array) => {
//         for (let i = 0; i < array.length; i++){
//             var user = array[i]
//             if(registrationEmail === user.email){
//                 registrationPage.querySelector('.error-message').classList.remove('off')
//             } else {
//                 array.push({
//                     username: registrationName,
//                     email: registrationEmail,
//                     password: registrationPassword
//                    })
//                 registrationPage.classList.add('off')
//                 loginPage.classList.remove('off')
//             }
//         }
//    }

   checkUserExists(users)
})

registrationPage.querySelector('a').addEventListener('click', function(event){
    event.preventDefault()
    registrationPage.classList.add('off')
    loginPage.classList.remove('off')
})

loginPage.querySelector('.primary-button').addEventListener('click', function(event){
    event.preventDefault()

    var inputEmail = loginPage.querySelector('input[name=email]').value
    var inputPassword = loginPage.querySelector('input[name=password]').value

    var checkCredentials = (users) => {
        for (let i = 0; i < users.length; i++)
            var user = users[i]

        if (inputEmail === user.email && inputPassword === user.password){
            loginPage.classList.add('off')
            homePage.classList.remove('off')
        } else loginPage.querySelector('.error-message').classList.remove('off')
    }

    checkCredentials(users)
})


