export const changeAvatar = (email, newAvatarUrl, password)=>{
  
  validateAvatarUrl(newAvatarUrl)
  validatePassword(password)
  
  let user = findUserByEmail(email)
  if(!user) throw new Error('User not found.')
  if (newAvatarUrl === user.avatar) throw new Error('The url entered is the same as the current url avatar image.')
  if (password !== user.password)  throw new Error('The password entered is not the current user password.');

  window.alert('The avatar image has been changed successfully.')
  user.avatar = newAvatarUrl
  profileImage.src = user.avatar
}
