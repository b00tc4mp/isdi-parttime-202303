function validateName(name) {
    if(typeof email !== 'string') throw new Error('Email is not a string')
    if(!email.trim().length) throw new Error('Email is empty')
}
function validateEmail(email) {
    if(typeof email !== 'string') throw new Error('Email is not a string')
    if(!email.trim().length) throw new Error('Email is empty')
}
function validatePassword(password, newPassword, repeatPassword, email) {
    // if(typeof email !== 'string') throw new Error('Email is not a string')
    // var currentUser = users.find(user => user.email === email)
    console.log(email)
    console.log(email.password)

    if(!password.trim().length) throw new Error('Password is empty')
    console.log(password.length)
    if(!password.trim().length > 8) throw new Error('Password must be higher than 8 characters')
    console.log(email.password, password)
    if(password.trim() !== email.password) throw new Error('Not your current password')
    
    if(email.password === newPassword) {
        userAccount.querySelector('.update-password p.message').classList.add('error')
        throw new Error('You need to set a new password')
    }
    
    if(newPassword !== repeatPassword) throw new Error('New password does not match')


}