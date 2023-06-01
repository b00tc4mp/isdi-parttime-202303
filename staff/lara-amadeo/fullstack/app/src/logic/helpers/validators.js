export const validateEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    
        if (!email.trim().length) throw new Error('Email is empty')
        if (!emailRegex.test(email)) throw new Error('Invalid email format')
    }

export const validatePassword = (password, explain= 'password') => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if (!password.trim().length) throw new Error(`${explain} is empty`)
    
    if (!passwordRegex.test(password)) throw new Error(`${explain} format incorrect`)
}

// export const validateUrlFormat = (url) => {
//     const avatarRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/

//     if (!avatarRegex.test(url)) throw new Error('Image1 format invalid')
// }

// export const validateBase64ImageFormat = (base64Url) => {
//     const avatarRegex = /^(data:image\/(?:png|jpeg|jpg|gif);base64,)[a-zA-Z0-9+/=\s]+$/

//     if (!avatarRegex.test(base64Url)) throw new Error('Image format invalid')
// }