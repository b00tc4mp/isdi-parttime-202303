import { loginPage } from '../pages/login-page.js';
import { logout, } from '../ui/login-register.js';
import { setOff, setOn, resetAlerts, clearForms, } from '../ui/general-tools.js'
import { displayProfile, displayWelcome, } from '../ui/home.js'
import { favoritesPage, profile, profileButtons, } from '../pages/home-user-profile-page.js';
import initPostsList from './posts-list.js';


export default function initNavbar(context, homePage, mainHome, postModal, profileForms) {
    const toLogout = document.querySelector('.logout');
    const toUserProfile = document.querySelector('.to-user-profile');
    const toHome = document.querySelector('.to-home');
    
    const toggleNav = document.querySelector('.nav-menu');
    const nav = document.querySelector('.navbar');
    const page = document.querySelector('.home-page');
    
    toggleNav.addEventListener('click', (event)  => {
      event.preventDefault();
      toggleNav.classList.toggle('close')
      nav.classList.toggle('show')
    })
    
    page.addEventListener('click', (event)  => {
      if((nav.classList).contains('show')){
        event.preventDefault();
        nav.classList.remove('show')
        toggleNav.classList.remove('close')
      }
    })
    
    toLogout.addEventListener('click', (event) => {
      event.preventDefault();
      clearForms();
      setOff(profile, profileForms, profileButtons, mainHome)
      logout(loginPage, homePage);
    });
    
    toUserProfile.addEventListener('click', (event) => {
      event.preventDefault();
      clearForms();
      resetAlerts();
      setOn(profile, profileButtons);
      setOff(mainHome, profileForms, favoritesPage);
      displayProfile(context.userAuth);
    });
    
    toHome.addEventListener('click', (event) => {
      event.preventDefault();
      clearForms();
      resetAlerts();
      setOn(mainHome);
      setOff(profile, profileButtons, profileForms);
      initPostsList(context.userAuth, postModal, 'all');
      displayWelcome(context.userAuth)
    });

}

