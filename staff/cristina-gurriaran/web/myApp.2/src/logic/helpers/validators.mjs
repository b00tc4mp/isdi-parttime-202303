console.log('load validators')

export function validateEmail(email){
    
    if(typeof email !== 'string') throw new Error ('email is not a string')
    if(!email.trim().length) throw new Error ('email is empty')
}

export function validatePassword(password, explain ='password'){

    if(typeof password !== 'string') throw new Error (`${explain} is not a string`)
    if(password.trim().length < 8) throw new Error (`${explain} has less than 8 characters`)
}


export function validateName(name) {

    if(typeof name !== 'string') throw new Error ('name is not a string')
    if(!name.trim().length) throw new Error ('name is empty')
}

export function validateUrl (url, explain = 'url'){
    
    if (typeof url !== 'string') throw new Error (`${explain} is not a string`)
    if (!url.trim().length) throw new Error (`${explain} is empty`)
}


export function validateId(id, explain = 'id') {
    if (typeof id !== 'string') throw new Error(`${explain} is not a string`)
    if (!id.trim().length) throw new Error(`${explain} is empty`)
}