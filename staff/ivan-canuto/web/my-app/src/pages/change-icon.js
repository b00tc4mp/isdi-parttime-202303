const changePasswordPage = document.querySelector('.change-password__page');
const changeAvatarPage = document.querySelector('.change-avatar__page');

changePasswordPage.querySelector('.old-password-icon').addEventListener('mousedown', ()=>{
  changePasswordPage.querySelector('.old-password').type = 'text';
})
changePasswordPage.querySelector('.old-password-icon').addEventListener('mouseup', ()=>{
  changePasswordPage.querySelector('.old-password').type = 'password';
})
changePasswordPage.querySelector('.new-password-icon').addEventListener('mousedown', ()=>{
  changePasswordPage.querySelector('.new-password').type = 'text';
})
changePasswordPage.querySelector('.new-password-icon').addEventListener('mouseup', ()=>{
  changePasswordPage.querySelector('.new-password').type = 'password';
})
changePasswordPage.querySelector('.new-password-repeated-icon').addEventListener('mousedown', ()=>{
  changePasswordPage.querySelector('.new-password-repeated').type = 'text';
})
changePasswordPage.querySelector('.new-password-repeated-icon').addEventListener('mouseup', ()=>{
  changePasswordPage.querySelector('.new-password-repeated').type = 'password';
})
changeAvatarPage.querySelector('.avatar-password-icon').addEventListener('mousedown', ()=>{
  changeAvatarPage.querySelector('.avatar-password').type = 'text';
})
changeAvatarPage.querySelector('.avatar-password-icon').addEventListener('mouseup', ()=>{
  changeAvatarPage.querySelector('.avatar-password').type = 'password';
})
