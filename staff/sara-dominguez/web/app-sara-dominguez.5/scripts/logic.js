function registerUser(name, email, password) {
   if (typeof name!== 'string') throw new Error('Name is not a string');
   if(!name.length) throw new Error('Name is empty')
   if (typeof email!== 'string') throw new Error('Email is not a string');
   if(!email.length) throw new Error('Email is empty')
   if (typeof password!== 'string') throw new Error('Password is not a string');
   if(!password.length) throw new Error('Password is empty')
   

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
    if (typeof email!== 'string') throw new Error('Email is not a string');
    if(!email.length) throw new Error('Email is empty')
    if (typeof password!== 'string') throw new Error('Password is not a string');
    if(!password.length) throw new Error('Password is empty')
   
    var foundUser= findUserByEmail(email)

    if(!foundUser) throw new Error ('User not found') 
    if (foundUser.password !== password) throw new Error ('Wrong password')
}

/*
WARN "nice", but not easy to read
return (!foundUser || foundUser.password !== password)? false : true
return !(!foundUser || foundUser.password !== password) 
*/

function retrieveUser(email) {
    if(!email.length) throw new Error('Email is empty')
    if (typeof email!=='string') throw new Error('Email is not a string')
    
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



// Function to validate changes or password--homepage-- hay que validarlo con el email

function validatedNewPassword(email, password, userNewPassword,userConfirmNewPassword) {
    if (typeof email!== 'string') throw new Error('Email is not a string');
    if(!email.length) throw new Error('Email is empty')
    if (typeof password!== 'string') throw new Error('Password is not a string');
    if(!password.length) throw new Error('Password is empty')
    if (typeof userNewPassword!== 'string') throw new Error('New password is not a string');
    if(!userNewPassword.length) throw new Error(' New password is empty')
    if (typeof userConfirmNewPassword!== 'string') throw new Error('New confirmed password is not a string');
    if(!userConfirmNewPassword.length) throw new Error('New confirmed password is empty')

    var foundUser= findUserByEmail(email)

    if(!foundUser) throw new Error ('User not found') 
    if (userNewPassword !== userConfirmNewPassword) new Error('New password and confirmed password do not match')
    if (foundUser.password !== password) throw new Error ('wrong  actual password') 
    if(password === userNewPassword) throw new Error ('You have to change the password')
    if(foundUser&& userNewPassword === userConfirmNewPassword) foundUser.password = userNewPassword          
}



