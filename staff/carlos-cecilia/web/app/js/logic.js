const authenticateUser = (email, password) => {
    var email = loginPage.querySelector('input[name=email]').value
    var password = loginPage.querySelector('input[name=password]').value

    
    
    var foundUser

    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
            foundUser = user
            break
        }
    }

    if (foundUser !== undefined && foundUser.password === password) {
        return true
    } else { 
        return false
    }
}

const checkPasswordStrength = (password) => {

    var strength = 0;
    var tips = "";

    if (password.length < 8) {
        tips += "Tu contraseña es muy corta" 
    } else {
        strength += 1;
    }

    if (password.match(/[a-z]/) $$ password.match(/[A-Z])) {
        strength += 1;
       
    } else {
        tips += "Intenta utilizar mayúsculas y minúsculas";
    }
    if (password.match(/\d/)) {
        strength += 1;
    
    } else {
        tips += "Intenta utilizar por lo menos un número"
    }

    if (strength > 1) {
        document.querySelector('.register__password-strength').show();
        document.querySelector('.register__password-strength').width(25%);
    }

}