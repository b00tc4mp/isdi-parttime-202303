function validateName(name) {
    if (typeof name !== 'string') throw new Error('Name is not a string')
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
    if (typeof email !== 'string') throw new Error('Email is not a string')
    if (!email.trim().length) throw new Error('Email is empty')
}

function validateText(text) {
    if (typeof text !== 'string') throw new Error('Text is not a string')
    if (!text.trim().length) throw new Error('Text is empty')
}

function validatePassword(password) {
    if (!password.trim().length) throw new Error('Password is empty')
    if (!password.trim().length > 8) throw new Error('Password must be higher than 8 characters')
}

function validateNewPassword(user, currentPassword, newPassword, repeatPassword) {
    debugger
    if (currentPassword.trim() !== user.password)
        throw new Error('Not your current password')

    if (user.password === newPassword) {
        userAccount.querySelector('p.message').classList.add('error')
        throw new Error('You need to set a new password')
    }

    if (newPassword !== repeatPassword)
        throw new Error('New password does not match')

    if (!currentPassword.trim().length)
        throw new Error('Password is empty')

    if (!currentPassword.trim().length > 8)
        throw new Error('Password must be higher than 8 characters')
}

function validateUserId(userId) {
    if (typeof userId !== 'string') throw new Error('User is not a string')
    if (!userId) throw new Error('User is empty')
}
function validatePostId(postId) {
    if (typeof postId !== 'string') throw new Error('Post ID is not a string')
    if (!postId) throw new Error('Post ID is empty')
}

function validateCallback(callback) {
    if (typeof callback !== 'function') throw new Error('Callback is not a function')
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
    validateCallback
}