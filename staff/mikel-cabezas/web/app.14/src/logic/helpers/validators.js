export function validateName(name) {
    if(typeof name !== 'string') throw new Error('Email is not a string')
    if(!email.trim().length) throw new Error('Email is empty')
}

export function validateImage(inputImage) {
    if(!inputImage) throw new Error('Image is empty')

    switch (inputImage.type) {
        case 'image/jpeg':
        case 'image/gif':
        case 'image/png':
        case 'image/webp':
            return true
    }
    throw new Error('File is not a valid image')

    if(inputImage.type  !== 'image/jpeg' || inputImage.type !== 'image/gif' || inputImage.type !== 'image/png' || inputImage.type !== 'image/webp')
        throw new Error('File is not a valid image')
}

export function validateEmail(email) {
    if(typeof email !== 'string') throw new Error('Email is not a string')
    if(!email.trim().length) throw new Error('Email is empty')
}

export function validateText(text) {
    if(typeof text !== 'string') throw new Error('Text is not a string')
    if(!text.trim().length) throw new Error('Text is empty')
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

export function validateId(userId) {
    if(typeof userId !== 'string') throw new Error('User is not a string')
    if(!userId) throw new Error('User is empty')
}
export function validatePost(postId) {
    if(typeof postId !== 'string') throw new Error('Post ID is not a string')
    if(!userId) throw new Error('Invalid post ID')
}
export function validateLikePostIconTarget(postId) {
    if(!postId) throw new Error('Invalid selector')
}
export function validateTotalPostLikesTarget(postId) {
    if(!postId) throw new Error('Invalid selector')
}
