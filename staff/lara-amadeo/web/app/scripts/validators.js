export const validateEmail = (registrationEmail) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    
        if (!registrationEmail.trim().length) throw new Error('Email is empty')
        if (!emailRegex.test(registrationEmail)) throw new Error('Invalid email format')
    }

export const validatePassword = (registrationPassword, explain= 'password') => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if (!registrationPassword.trim().length) throw new Error(`${explain} is empty`)
    
    if (!passwordRegex.test(registrationPassword)) throw new Error(`${explain} format incorrect`)
}

export const validateAvatarFormat = (avatarUrl) => {
    const avatarRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i

    if (!avatarRegex.test(avatarUrl)) throw new Error('Image format invalid')
}