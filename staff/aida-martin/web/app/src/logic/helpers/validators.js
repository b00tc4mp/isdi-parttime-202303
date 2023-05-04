export function validateEmail (email) {
  if (typeof email !== 'string') { throw new Error('Email is not a string 😥', { cause: 'userError' }) }
  if (!email.trim().length) { throw new Error('Email is empty 😥', { cause: 'userError' }) }

  const validEmail = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})/i.test(
    email
  )

  if (!validEmail) { throw new Error('Email is not valid 😥', { cause: 'userError' }) }
}
export function validatePassword (password, explain = 'Password') {
  if (typeof password !== 'string') { throw new Error(`${explain} is not a string 😥`, { cause: 'userError' }) }
  if (!password.trim().length) { throw new Error(`${explain} is empty 😥`, { cause: 'userError' }) }
  if (password.length < 8) {
    throw new Error(`${explain} does not have 8 characters 😥`, {
      cause: 'userError'
    })
  }
}

export function validateName (name) {
  if (typeof name !== 'string') { throw new Error('Name is not a string 😥', { cause: 'userError' }) }
  if (!name.trim().length) { throw new Error('Name is empty 😥', { cause: 'userError' }) }
}

export function validateUrl (url, explain = 'Url') {
  if (typeof url !== 'string') { throw new Error(`${explain} is not a string 😥`, { cause: 'userError' }) }
  if (!url.trim().length) { throw new Error(`${explain} is empty 😥`, { cause: 'userError' }) }
}

export function validateId (id, explain = 'User ID') {
  if (typeof id !== 'string') { throw new Error(`${explain} is not a string 😥`, { cause: 'userError' }) }
  if (!id.trim().length) { throw new Error(`${explain} is empty 😥`, { cause: 'userError' }) }
}

export function validateText (text, explain = 'Text') {
  if (typeof text !== 'string') { throw new Error(`${explain} is not a string 😥`, { cause: 'userError' }) }
  if (!text.trim().length) { throw new Error(`${explain} is empty 😥`, { cause: 'userError' }) }
}
