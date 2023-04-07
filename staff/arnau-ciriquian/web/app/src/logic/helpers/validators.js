export function validateEmail(email) {
    if (typeof email !== 'string') throw new Error('email is not a string')
    if (!email.length) throw new Error('email is empty')
    if (!email.match(/\S+@\S+\.\S+/)) throw new Error('email is not a valid adress')
}

export function validateNewPassword(password, explain = 'password') {
    if (typeof password !== 'string') throw new Error('password is not a string')
    if (password.length < 4) throw new Error(`${explain} is shorter than 4 characters`)
    if (password.search(/[a-z]/) < 0) throw new Error(`${explain} does not include a lowercase`)
    if (password.search(/[A-Z]/) < 0) throw new Error(`${explain} does not include an uppercase`)
    if (password.search(/[0-9]/) < 0) throw new Error(`${explain} does not include a number`)
    if (password.search(/\s/) > 0) throw new Error(`${explain} includes a blank space`)
}

export function validateName(name, explain = 'name') {
    if (typeof name !== 'string') throw new Error(`${explain} is not a string`)
    if (!name.length) throw new Error(`${explain} is empty`)
}

export function validatePasswordConfirm(password, passwordConfirm, explainOne = 'password confirmation', explainTwo ='password') {
    if (typeof passwordConfirm !== 'string') throw new Error(`${explain}confirmation is not a string`)
    if(!passwordConfirm.length) throw new Error(`${explainOne} confirmation is empty`)
    if (password !== passwordConfirm) throw new Error(`${explainOne} confirmation is different than ${explainTwo}`)
}

export function validatePassword(password) {
    if (typeof password !== 'string') throw new Error('password is not a string')
    if(!password.length) throw new Error('password is empty')
}

export function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new Error(`${explain} is not a string`)
    if (!id.trim().length) throw new Error(`${explain} is empty`)
}

export function validateUrl(url, explain = 'url') {
    if (typeof url !== 'string') throw new Error(`${explain} is not a string`)
    if (!url.trim().length) throw new Error(`${explain} is empty`)
}