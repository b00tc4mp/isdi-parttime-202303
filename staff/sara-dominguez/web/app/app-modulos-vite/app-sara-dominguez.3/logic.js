function registerUser(name, email, password) {
    var foundUser

    for(var i = 0; i< users.length; i++){
        var user = users[i]

        if(user.email === email){
            foundUser= user
        break
        }
    }
/* founderUser !== undefined, es decir, si existe*/
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
    var foundUser
    
    for (var i= 0; i < users.length; i++) {
        var user = users[i]

        if(user.email === email){
            foundUser = user
          
        break
        }  
    }

    // TODO codificar que foundUser.password es un número
    if(!foundUser || foundUser.password !== password){
        return false
    }else{
        alert(`Welcome ${user.name}`)
        return true
        
    }
}

/*
WARN "nice", but not easy to read
return (!foundUser || foundUser.password !== password)? false : true
return !(!foundUser || foundUser.password !== password) 
*/

// Function to validate changes or password--homepage

function validatedNewPassword(userActualPassword, userNewPassword,userConfirmNewPassword) {
    var foundUserPassword 

    for (var i = 0; i< users.length; i++){
        var user= users[i].password

        if(user === userActualPassword){
            foundUserPassword = user
            break
        }
    }
        
    if (foundUserPassword && userNewPassword !== userConfirmNewPassword){
        alert('please, confirm the same new password you entered')
        return false
    } else if (!foundUserPassword && userNewPassword === userConfirmNewPassword){
        alert('wrong actual password')
        return false
    } else {
    
        if(foundUserPassword && userNewPassword === userConfirmNewPassword){
            //remove un password por otro
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