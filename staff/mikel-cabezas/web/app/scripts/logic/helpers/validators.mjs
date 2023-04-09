export function validateName(name) {
    if(typeof email !== 'string') throw new Error('Email is not a string')
    if(!email.trim().length) throw new Error('Email is empty')
}
export function validateImage(inputImage) {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if(typeof inputImage !== 'file') throw new Error('Image is not a file')
    if(inputImage !== 'image/gif' || inputImage !== 'image/jpeg' || inputImage !== 'image/png' || inputImage !== 'image/webp' ) throw new Error('Image is not a file')
    if(!inputImage) throw new Error('Image is empty')
}
export function validateEmail(email) {
    if(typeof email !== 'string') throw new Error('Email is not a string')
    if(!email.trim().length) throw new Error('Email is empty')
}
export function validatePassword(password) {
    if(!password.trim().length) throw new Error('Password is empty')

    if(!password.trim().length > 8) throw new Error('Password must be higher than 8 characters')
}
export function validateNewPassword(password, newPassword, repeatPassword, user) {

    if(password.trim() !== user.password) 
        throw new Error('Not your current password')
    
    if(user.password === newPassword) {
        userAccount.querySelector('p.message').classList.add('error')
        throw new Error('You need to set a new password')
    }
    
    if(newPassword !== repeatPassword) 
        throw new Error('New password does not match')
        
    if(!password.trim().length) 
        throw new Error('Password is empty')

    if(!password.trim().length > 8) 
        throw new Error('Password must be higher than 8 characters')
}