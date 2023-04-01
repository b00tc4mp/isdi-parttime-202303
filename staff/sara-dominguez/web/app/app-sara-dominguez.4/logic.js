function registerUser(name, email, password) {
   var foundUser =findUserByEmail(email)

    if(foundUser ){
        return false

    // TODO mark email input in red
    }else{
     users.push({
        name: name,
        email: email,
        password: password,
        })
        console.log(users)
    }
    return true
}

//TODO go to login
function authenticateUser (email, password) {
    
    var foundUser= findUserByEmail(email)

    // TODO codificar que foundUser.password es un número
    if(!foundUser || foundUser.password !== password){
        return false
    }else{
        return true
        
    }
}

/*
WARN "nice", but not easy to read
return (!foundUser || foundUser.password !== password)? false : true
return !(!foundUser || foundUser.password !== password) 
*/

function retrieveUser(email) {
    var foundUser = findUserByEmail(email)
   
    if(!foundUser || foundUser.email !== email){
        return false
    }else{
        var user = {
            name: foundUser.name, 
            email: foundUser.email
        } 
        return user
    }
}



// Function to validate changes or password--homepage-- hay que validarlo con el email

function validatedNewPassword(email, password, userNewPassword,userConfirmNewPassword) {
 
    var foundUser= findUserByEmail(email)

    if(!foundUser){
        return false
    }
    
    if (userNewPassword !== userConfirmNewPassword){
        alert('please, confirm the same new password you entered')
        return false
    } 
    
    if (foundUser.password !== password){
        alert('wrong actual password')
        return false
    
    } 
    if(password === userNewPassword){
        alert('You have to change the password')
        return false
    } else {
    
        if(foundUser&& userNewPassword === userConfirmNewPassword){
          
            foundUser.password = userNewPassword
            console.log("sustituyo password")
         return true
        }
    }    
    
}



/*
TODO show "hello, <username>" on login
TODO add link to profile in home page and open a profile panel
TODO add a form in profile panel to allow the user to update his/her password (asking 
current password, and new password and new password confirmation 
*/