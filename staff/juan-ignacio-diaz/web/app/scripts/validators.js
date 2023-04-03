function validateEmail(email, cause) {
    if (typeof email !== 'string') throw new Error('email is not an string', {cause: "email"})
    if (!email.trim().length) throw new Error('email is empty', {cause: "email"})
    if (!email.includes("@")) throw new Error('the email is wrong', {cause: "email"})
}

function validatePassword(password, explain = 'password') {
    if (typeof password !== 'string') throw new Error(`${explain} is not a string`, {cause: explain})
    if (password.trim().length < 8) throw new Error(`${explain} length lower than 8 characters`, {cause: explain})
}

function validateName(name) {
    if (typeof name !== 'string') throw new Error('name is not a string', {cause: "name"})
    if (!name.trim().length) throw new Error('name is empty', {cause: "name"})
}

function validateUrl(url, explain = 'url') {
    if (typeof url !== 'string') throw new Error(`${explain} is not a string`, {cause: explain})
    if (!url.trim().length) throw new Error(`${explain} is empty`, {cause: explain})
}

    // TODO validate email format with regex pattern