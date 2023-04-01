function registerUser(name, email, password) {
    var foundUser

    for(var i = 0; i< users.length; i++){
        var user = users[i]

        if(user.email === email){
            foundUser= user
        break
        }
    }

    if(foundUser /* founderUser !== undefined, es decir, si existe*/){
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
    if(!foundUser || foundUser.password != password){
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

/*
TODO show "hello, <username>" on login
TODO add link to profile in home page and open a profile panel
TODO add a form in profile panel to allow the user to update his/her password (asking 
current password, and new password and new password confirmation */