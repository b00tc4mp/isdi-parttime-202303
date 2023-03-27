var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.home')
var registerPage = document.querySelector('.register')
var authenticatedEmail
/*

registerPage.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault()

    // TODO how to get all data from form inputs

    registerPage.classList.add('off')

    loginPage.classList.remove('off')
})
*/


function loginsection(){
   
  
   
  registerPage.classList.add('off');
    homePage.classList.add('off');
    loginPage.classList.remove('off');

}
function registersection(){
    
    
 registerPage.classList.remove('off');
  homePage.classList.add('off');
  loginPage.classList.add('off');


 }



 registerPage.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault()


    var bpass=false;
    var name = registerPage.querySelector('input[name=name]').value
    console.log(name)
    
    var email = registerPage.querySelector('input[name=email]').value
    if (!emailValidation(email)){
        alert('This email used was wrong, please write one correct')
        console.log('This email used was wrong, please write one correct')
        bpass=false
    }else
      bpass=true
    
    var password = registerPage.querySelector('input[name=password]').value

    if(!passwordValidation(password) && bpass)
    {
      alert('Password between 6 to 20 characters which contains at least one numeric digit, one uppercase, and one lowercase letter')
      console.log('Password between 6 to 20 characters which contains at least one numeric digit, one uppercase, and one lowercase letter')
      bpass=false
    }else
    {
      var password2 = registerPage.querySelector('input[name=repassword]').value
      if (password2==password)
        bpass=true
        else{
          alert('The password an verification password are distincs')
      console.log('The password an verification password are distincs')
          bpass=false
        }
    }
    if(bpass)
    {
    var result = registerUser(name, email, password)
console.log(result)
    if (result === false) {
      console.log('user already exists')
        alert('user already exists')
    } else {
        registerPage.classList.add('off')
        loginPage.classList.remove('off')
    }
  }
})

loginPage.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault()

    const lblwrong = document.querySelector('#lblwrong');
    const lbllogout = document.querySelector('#alogout');
    const lbllogin = document.querySelector('#alogin');

    var email = loginPage.querySelector('input[name=email]').value
    var password = loginPage.querySelector('input[name=password]').value
    console.log(email + ' entrar')
    var result = authenticateUser(email, password)


    if (result === false) {
      
        lblwrong.classList.remove("off");
    } else {
      
        authenticatedEmail = email
    
        loginPage.classList.add('off')
        homePage.classList.remove('off')
        lbllogout.classList.remove("off")
        lbllogin.classList.add('off')
    }
})

