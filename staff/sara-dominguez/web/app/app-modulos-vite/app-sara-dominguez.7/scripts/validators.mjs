 console.log('load validators')
 
 export function validateName(name) {
    if (typeof name!== 'string') throw new Error('Name is not a string');
    if(!name.trim().length) throw new Error('Name is empty')
    if(name.trim().length < 3) throw new Error('Name minimun 3 characters')
    if(name.trim().length >15) throw new Error('Name maximun 15 characters')

    // TODO regex pattern 
}

export function validateEmail(email) {
    if (typeof email!== 'string') throw new Error('Email is not a string');
    if(!email.trim().length) throw new Error('Email is empty')
}

export function validatePassword(password) {
    if (typeof password!=='string') throw new Error('Password is not a string');
    if(!password.trim().length) throw new Error('Password is empty')
    if(password.trim().length < 6 ) throw new Error('Password minimun 6 characters')
    if(password.trim().length > 12) throw new Error('Password maximum 12 characters')
}   
export function validateUserNewPassword(userNewPassword) {
    if (typeof userNewPassword!== 'string') throw new Error('New password is not a string');
    if(!userNewPassword.trim().length) throw new Error(' New password is empty')
    if(userNewPassword.trim().length < 6) throw new Error('New passwordd minimun 6 characters')
    if(userNewPassword.trim().length > 12) throw new Error('New password maximum 12 characters')
}

export function validateUserAvatar(newAvatar){
    if (typeof newAvatar!=='string') throw new Error('Avatar is not a string');
    if(!newAvatar.trim().length) throw new Error('Avatar is empty')   
}

export function validateUserConfirmNewPassword(userConfirmNewPassword) {
    if (typeof userConfirmNewPassword!== 'string') throw new Error('New confirmed password is not a string');
    if(!userConfirmNewPassword.trim().length) throw new Error('New confirmed password is empty')
    if(userConfirmNewPassword.trim().length < 6) throw new Error('New confirmed passwordd minimun 6 characters')
    if(userConfirmNewPassword.trim().length > 12) throw new Error('New confirmed password maximum 12 characters')
}