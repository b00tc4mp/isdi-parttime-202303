console.debug('load validators')

function validateName(name) {

    if (typeof name !== 'string') throw new Error('name is not a string');
    if (!name.trim().length) throw new Error('name is empty')
    if (name.trim().length < 3) throw new Error('name minimun 3 characters')
    if (name.trim().length > 15) throw new Error('name maximun 15 characters')

    // TODO regex pattern 
}

function validateEmail(email) {
    const emailRegex = /^[\w-.]+@[\w-]+(\.[a-zA-Z]{2,4}){1,2}$/

    if (typeof email !== 'string') throw new Error('email is not a string')
    if (!email.trim().length) throw new Error('email is empty')
    if (!emailRegex.test(email)) throw new Error('invalid email')
}

function validatePassword(password) {
    const hasDigit = /\d/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const specialChar = /[-_+/#&]/.test(password)

    if (!password.trim().length) throw new Error('password is empty')
    if (!hasDigit) throw new Error('password must have at least one digit')
    if (!hasUpper) throw new Error('Password must have at least one uppercase')
    if (!hasLower) throw new Error('password must have at least one lowercase')
    if (!specialChar) throw new Error('password must have at least one special character')
    if (typeof password !== 'string') throw new Error('password is not a string')
    if (password.trim().length < 6) throw new Error('password minimun 6 characters')
    if (password.trim().length > 15) throw new Error('password maximum 15 characters')
}
function validateUserNewPassword(userNewPassword) {
    const hasDigit = /\d/.test(userNewPassword)
    const hasUpper = /[A-Z]/.test(userNewPassword)
    const hasLower = /[a-z]/.test(userNewPassword)
    const specialChar = /[-_+/#&]/.test(userNewPassword)

    if (!hasDigit) throw new Error('Password must have at least one digit')
    if (!hasUpper) throw new Error('Password must have at least one uppercase')
    if (!hasLower) throw new Error('Password must have at least one lowercase')
    if (!specialChar) throw new Error('Password must have at least one special character')
    if (typeof userNewPassword !== 'string') throw new Error('New password is not a string');
    if (!userNewPassword.trim().length) throw new Error(' New password is empty')
    if (userNewPassword.trim().length < 6) throw new Error('New passwordd minimun 6 characters')
    if (userNewPassword.trim().length > 12) throw new Error('New password maximum 12 characters')
}

function validateUserAvatar(newAvatar, explain = 'url') {
    if (typeof newAvatar !== 'string') throw new Error(`${explain} is not a string`);
    if (!newAvatar.trim().length) throw new Error(`${explain} is empty`)
}

function validateUserConfirmNewPassword(userConfirmNewPassword) {
    const hasDigit = /\d/.test(userConfirmNewPassword)
    const hasUpper = /[A-Z]/.test(userConfirmNewPassword)
    const hasLower = /[a-z]/.test(userConfirmNewPassword)
    const specialChar = /[-_+/#&]/.test(userConfirmNewPassword)

    if (!hasDigit) throw new Error('Password must have at least one digit')
    if (!hasUpper) throw new Error('Password must have at least one uppercase')
    if (!hasLower) throw new Error('Password must have at least one lowercase')
    if (!specialChar) throw new Error('Password must have at least one special character')
    if (typeof userConfirmNewPassword !== 'string') throw new Error('New confirmed password is not a string');
    if (!userConfirmNewPassword.trim().length) throw new Error('New confirmed password is empty')
    if (userConfirmNewPassword.trim().length < 6) throw new Error('New confirmed passwordd minimun 6 characters')
    if (userConfirmNewPassword.trim().length > 12) throw new Error('New confirmed password maximum 12 characters')
}

function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new Error(`${explain} is not a string`);
}
function validatePostId(postId, explain = 'post id') {
    if (typeof postId !== 'string') throw new Error(`${explain} is not a string`);
}
function validatePostUrl(imageUrl, explain = 'image url') {
    if (typeof imageUrl !== 'string') throw new Error(`${explain} is not a string`);
    if (!imageUrl.trim().length) throw new Error(`${explain} is empty`)
}

function validateText(text, explain = 'text') {
    if (typeof text !== 'string') throw new Error(`${explain} is not a string`);
    if (!text.trim().length) throw new Error(`${explain} is empty`)
}

function validateCallback(callback, explain = 'callback') {
    if (typeof callback !== 'function') throw new Error(`${explain} is not a function`);
}

module.exports = {
    validateName,
    validateEmail,
    validatePassword,
    validateUserNewPassword,
    validateUserAvatar,
    validateUserConfirmNewPassword,
    validateId,
    validatePostId,
    validatePostUrl,
    validateText,
    validateCallback
}