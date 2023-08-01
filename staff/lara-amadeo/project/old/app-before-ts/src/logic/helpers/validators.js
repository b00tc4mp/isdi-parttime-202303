export const validateEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!email.trim().length) throw new Error('Email is empty')
    if (!emailRegex.test(email)) throw new Error('Invalid email format')
}

export const validatePassword = (password, explain = 'password') => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if (!password.trim().length) throw new Error(`${explain} is empty`)

    if (!passwordRegex.test(password)) throw new Error(`${explain} format incorrect`)
}

export const validateToken = (token, explain = 'password') => {
    if (typeof token !== 'string') throw new TypeError(`${explain} is not a string`)
    if (token.split('.').length !== 3) throw new Error(`${explain} is not valid`)
}