export default function initDeleteAccount(context, profilePage) {
    const toDeleteAccount = document.querySelector('.to-delete-account');

    const deleteAccount = document.querySelector('.delete-account');
    const deleteForm = document.querySelector('.delete-form');

    
  
    deleteForm.addEventListener('submit', (event) => {
      event.preventDefault();
      try {
        deleteUser(context.userAuth);
        logout(loginPage, homePage);
        setAlertUserDeleted();
        setOff(profile, profileForms, profileButtons, mainHome)
      } catch (error) {
        console.log(error)
      }
    });

    toDeleteAccount.addEventListener('click', (event) => {
        event.preventDefault();
        clearForms();
        setOn(profile.deleteAccount,profileForms);
        setOff(profile.deleteAvatar, profile.editProfile, profile.setAvatar, profileButtons, profile.changePassword, profile.editMail );
    });
}