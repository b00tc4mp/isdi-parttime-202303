/*import initProfileForms from "./edit-profile-forms";
import initPostsList from '../components/posts-list.js';
import { mainHome, postModal, profileForms } from '../pages/home-page.js';
import { setOff, setOn, resetAlerts, clearForms } from '../ui/general-tools.js'
import { setPlaceHolders,  } from '../ui/home.js'
import { favoritesPage, profileButtons } from "../pages/home-user-profile-page";

export default function initProfileButtons(context, profilePage) {
    const toEditProfile = document.querySelector('.to-edit-profile');
    const toChangePassword = document.querySelector('.to-change-password');
    const toEditMail = document.querySelector('.to-edit-mail');
    
    const toFavorites = document.querySelector('.to-favorites');
    
    const profile = initProfileForms(context, profilePage, profileForms, profileButtons)

    toFavorites.addEventListener('click', (event) => {
        event.preventDefault();
        clearForms();
        const postFavsList = document.querySelector('.favorites-post-list');
        initPostsList(context.userAuth, postModal, 'fav', postFavsList);
        setOn(favoritesPage);
        setOff(profileButtons, profile.changePassword, profile.editProfile, profile.deleteAccount, profileForms);
    });
      
    toChangePassword.addEventListener('click', (event) => {
        event.preventDefault();
        clearForms();
        setOn(profile.changePassword, profileForms);
        setOff(profileButtons, profile.editProfile, profile.editMail, profile.deleteAccount);
    });
    
    toEditMail.addEventListener('click', (event) => {
        event.preventDefault();
        clearForms();
        setPlaceHolders(context.userAuth);
        setOn(profile.editMail, profileForms);
        setOff(profileButtons, profile.changePassword, profile.editProfile, profile.deleteAccount)
    });
      

        
    toEditProfile.addEventListener('click', (event) => {
        event.preventDefault();
        clearForms();
        resetAlerts();
        setPlaceHolders(context.userAuth);
        setOn(profile.editProfile, profile.setAvatar, profileForms);
        setOff(mainHome, profileButtons, profile.changePassword, profile.editMail, profile.deleteAccount);
    });

    return { toChangePassword, toDeleteAccount, toEditMail, toEditProfile, toFavorites }
}
*/