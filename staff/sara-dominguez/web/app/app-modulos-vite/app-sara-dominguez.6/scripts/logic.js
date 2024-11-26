function registerUser(name, email, password) {
  validateName(name)
  validateEmail(email) 
  validatePassword(password)   

    var foundUser =findUserByEmail(email)

    if(foundUser )
        throw new Error('User already exists') 

    // TODO mark email input in red
    
     users.push({
        name: name,
        email: email,
        password: password,
        })
}


function authenticateUser (email, password) {
    validateEmail(email)    
    validatePassword(password)
 

    var foundUser= findUserByEmail(email)

    if(!foundUser) throw new Error ('User not found') 
    if (foundUser.password !== password) throw new Error ('Wrong password')
    return foundUser
}

/*
WARN "nice", but not easy to read
return (!foundUser || foundUser.password !== password)? false : true
return !(!foundUser || foundUser.password !== password) 
*/

function retrieveUser(email) {
   validateEmail(email)
    
    var foundUser = findUserByEmail(email)
   
    if(!foundUser) throw new Error ('User not found') 
    if (foundUser.email !== email) throw new Error ('Wrong email')
        
    else{
        var user = {
            name: foundUser.name, 
            email: foundUser.email
        } 
        return user
    }
}

// Function to validate changes of user avatar

function updateUserAvatar(email, newAvatar) {
   //validateEmail(email)
  // validateNewAvatar(newAvatar)

   var foundUser = findUserByEmail(email)

    if(!foundUser) throw new Error ('User not found') 
    if (foundUser.email!== email) throw new Error ('Wrong email')
        
    else{
        foundUser.avatar = newAvatar
    }
}




// Function to validate changes or password--homepage-- hay que validarlo con el email

function validatedNewPassword(email, password, userNewPassword,userConfirmNewPassword) {
    validateEmail(email)
    validatePassword(password)
    validateUserNewPassword(userNewPassword)
    validateUserConfirmNewPassword(userConfirmNewPassword)

    var foundUser= findUserByEmail(email)

    if(!foundUser) throw new Error ('User not found') 
    if (userNewPassword !== userConfirmNewPassword)throw new Error('New password and confirmed password do not match')
    if (foundUser.password !== password) throw new Error ('wrong  actual password') 
    if(password === userNewPassword) throw new Error ('You have to change the password')
    if(foundUser&& userNewPassword === userConfirmNewPassword) foundUser.password = userNewPassword          
}



