export const changePassword = (email, oldPassword, newPassword, newPasswordRepeated)=>{
  
  validatePassword(oldPassword, 'old password')
  validatePassword(newPassword, 'new password')
  validatePassword(newPasswordRepeated, 'new password confirm')

  let user = findUserByEmail(email);
  if (oldPassword !== user.password)  throw new Error('The password entered is not the current user password.');

  if (newPassword.length < 6 || newPasswordRepeated.length < 6)  throw new Error('The new password entered is too short.')
  
  if (newPassword !== newPasswordRepeated)  throw new Error('The new two passwords entered are not the same.');
  
  window.alert('The password has been changed successfully.')
  user.password = newPassword;
}
