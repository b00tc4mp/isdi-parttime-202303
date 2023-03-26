//data
var users=[]

users.push({
    name: 'Rufus',
    email: 'rufus@rufus.es',
    password: 123456
})

users.push({
    name: 'Frida',
    email: 'frida@frida.es',
    password: 123456
})

users.push({
    name: 'Tigre',
    email: 'tigre@tigre.es',
    password: 123456
})



//logic

//presentation

//refactored code agaist the APP version
var registerPage= document.querySelector('.register')
var loginPage= document.querySelector('.login')


// capture datas Register form
registerPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    users.push({
        name: (registerPage.querySelector('input[name=name]').value),
        email: (registerPage.querySelector('input[email=email]').value),
        password: (registerPage.querySelector('input[password=password]')).value
    })

    console.log(users)
    
    document.querySelector('.register').classList.add('off')
    document.querySelector('.login').classList.remove('off')
    
})

//capture datas Login form
loginPage.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault()

    var email= loginPage.querySelector('input[email=email]').value
    var password= loginPage.querySelector('input[password=password]').value

    console.log(email, password)

    const foundUser= (email) => {
        for(let i= 0; i < users.length; i++ ){
            if ((users[i].email).includes(email)===true){
                alert(`welcome, ${users[i].name}`)
    
                    document.querySelector('.login').classList.add('off')
                    document.querySelector('.home').classList.remove('off')
                    
                return foundUser

                }else{
              alert(('Wrong email or password'))
              return foundUser
            }
        }
       
    }
    foundUser(email);
})

//configurate anchor <a> Login

loginPage.querySelector('a').addEventListener('click', function(event){
    event.preventDefault()


    document.querySelector('.login').classList.add('off')
    registerPage.classList.remove('off')
})

//configurate anchor <a> Login

registerPage.querySelector('a').addEventListener('click', function(event){
    event.preventDefault()

    document.querySelector('.register').classList.add('off')
    document.querySelector('.login').classList.remove('off')
})

