const checkNewUser = (userEmail) => {
    const userFound = users.find(user => user.email === userEmail)
    if(userFound) throw new Error('Email already registered')
}

function validateEmail(email, emailExpression) {
    if(typeof email !== 'string') throw new Error('Email is not a string')
    if(!email.trim().length) throw new Error ('Email is empty')
    if (!emailExpression.test(email)) throw new Error('Email format is wrong')
}

function validateUrl(avatarUrl, explain = 'url'){
    if(typeof avatarUrl !== 'string') throw new Error(`${explain} is not a string`)
    if(!avatarUrl.trim().length) throw new Error(`${explain} is empty`)
}

function validateName(userName){
    if (userName.trim().length < 1) throw new Error('Name is empty')
    if (/\d/.test(userName)) throw new Error ('Name contains numbers')
}

function validatePassword(userPassword){
    if (userPassword.length < 8) throw new Error('Password must have at least 8 characters')
    if (!passwordExpression.test(userPassword)) throw new Error('Password format is not valid')
}

const emailExpression = /^[\w-.]+@[a-zA-Z0-9]+(\.[a-zA-Z]{2,4}){1,2}$/
const passwordExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[a-zA-Z\d#$@!%&*?]{8,16}/