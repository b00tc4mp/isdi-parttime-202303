function validateName(name) {
    if (typeof name !== 'string') throw new TypeError('Name is not a string')
    if (!name.trim().length) throw new Error('Name is empty')
}

function validateImage(inputImage) {
    if (!inputImage) throw new Error('Image is empty')

    switch (inputImage.type) {
        case 'image/jpeg':
        case 'image/gif':
        case 'image/png':
        case 'image/webp':
            return true
    }
    throw new Error('File is not a valid image')

    if (inputImage.type !== 'image/jpeg' || inputImage.type !== 'image/gif' || inputImage.type !== 'image/png' || inputImage.type !== 'image/webp')
        throw new Error('File is not a valid image')
}

function validateEmail(email) {
    if (typeof email !== 'string') throw new TypeError('Email is not a string')
    if (!email.trim().length) throw new Error('Email is empty')
}

function validateText(text) {
    if (typeof text !== 'string') throw new TypeError('Text is not a string')
    if (!text.trim().length) throw new Error('Text is empty')
}

function validatePassword(password) {
    if (!password.trim().length) throw new Error('Password is empty')
    if (!password.trim().length > 8) throw new Error('Password must be higher than 8 characters')
}

function validateNewPassword(currentPassword, newPassword, repeatPassword) {
    if (newPassword !== repeatPassword)
        throw new Error('New password does not match')

    if (!currentPassword.trim().length)
        throw new Error('Password is empty')

    if (!currentPassword.trim().length > 8)
        throw new Error('Password must be higher than 8 characters')
}

function validateUserId(userId) {
    if (typeof userId !== 'string') throw new TypeError('User is not a string')
    if (!userId) throw new Error('User is empty')
}
function validatePostId(postId) {
    if (typeof postId !== 'string') throw new TypeError('Post ID is not a string')
    if (!postId) throw new Error('Post ID is empty')
}

function validateCallback(callback) {
    if (typeof callback !== 'function') throw new TypeError('Callback is not a function')
}

function validateToken(token, explain = 'token') {
    if (typeof token !== 'string') throw new TypeError(`${explain} is not a string`)
    if (token.split('.').length !== 3) throw new Error(`${explain} is not valid`)


}

module.exports = {
    validateName,
    validateImage,
    validateEmail,
    validateText,
    validatePassword,
    validateNewPassword,
    validateUserId,
    validatePostId,
    validateCallback,
    validateToken
}