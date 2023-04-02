const validateName = (name)=>{
  if (!name.length) throw new Error('Name field is empty.');
  if (typeof name !== 'string') throw new Error('Name is not a string.')
}
const validateEmail = (email, explanation = 'email')=>{
  if (!email.length) throw new Error(`The ${explanation} field is empty.`);
  if (typeof email!=='string') throw new Error(`The ${explanation} is not a string.`)
}
const validatePassword = (password, explanation = 'password')=>{
  if (!password.length) throw new Error(`The ${explanation} field is empty.`);
  if (typeof password!=='string') throw new Error(`The ${explanation} is not a string.`)
}
const validateAvatarUrl = (newAvatarUrl, explanation = 'avatar url')=>{
  if (!newAvatarUrl.length) throw new Error(`The ${explanation} field is empty.`);
  if (typeof newAvatarUrl !=='string') throw new Error(`The ${explanation} is not a string.`)

  const correctUrl = /(jpe?g|png|webp)/;
  if (!correctUrl.test(newAvatarUrl)) throw new Error(`The url entered does not includes a .jpg/.jpg/.webp/.png extension.`)
  
}