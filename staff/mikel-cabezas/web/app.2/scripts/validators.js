function validateEmail(email) {
    if(typeof email !== 'string') throw new Error('Email is not a string')
    if(!email.trim().length) throw new Error('Email is empty')
}
if(!email.trim().length > 8 !== 'string') throw new Error('Email is not a string')