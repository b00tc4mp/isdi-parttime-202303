//data

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

//presentation

var registerPage = document.querySelector('.register-page')
var loginPage = document.querySelector('.login-page')
var homePage = document.querySelector('.home-page')

document.querySelector(".go-to-sign-in").addEventListener("click", (event) => {
    event.preventDefault();
    registerPage.classList.add("off");
    loginPage.classList.remove("off")
})

document.querySelector(".register-now-button").addEventListener("click", (event) => {
    event.preventDefault();
    loginPage.classList.add("off");
    registerPage.classList.remove("off");
})

document.querySelector(".register-button").addEventListener("click", (event) => {
    event.preventDefault();
    var newUser = []
    document.querySelectorAll(".inputs .input-field").forEach(field => {
        newUser.push(field.value)
    })

    var foundUser

    for (let i = 0; i < users.length; i++) {
        var user = users[i]
        if (user.email === newUser[1]){
            foundUser = user
            break
        }
    }

    if (foundUser !== undefined && foundUser.password === newUser[2]) {
        loginPage.classList.add('off')
        homePage.classList.remove('off')
    } else alert('Wrong password or email')

})

document.querySelector(".login-button").addEventListener("click", (event) => {
    event.preventDefault();
    var newUser = []
    document.querySelectorAll(".login-inputs .input-field").forEach(field => {
        newUser.push(field.value)
    })
    console.log(newUser)
    var foundUser

    for (let i = 0; i < users.length; i++) {
        var user = users[i]
        if (user.email === newUser[0]){
            foundUser = user
            break
        }
    }

    if (foundUser !== undefined && foundUser.password === newUser[1]) {
        loginPage.classList.add('off')
        homePage.classList.remove('off')
    } else alert('Wrong password or email')

})