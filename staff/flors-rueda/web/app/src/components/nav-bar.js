import { svg } from '../../assets/svg-paths.js';
import { clearForms, resetAlert, setOff, setOn, setPredeterminateAvatar } from '../ui/general-tools.js';
import { login, loginPage } from '../pages/login-page.js';

export default function initNavbar(context, homePage, homeMain, homeUser, postModal) {

  const navbar = document.querySelector('.nav-header');
  const profileForms = document.querySelector('.profile-forms');
  const profileUserPosts = document.querySelector('.home-page__user-profile--posts')
  const profileFavs = document.querySelector('.home-page__user-profile--favorites');
  const profileButtons = document.querySelector('.home-page__user-profile--buttons')
  const alert = document.querySelector('.alert')

  const toLogout = navbar.querySelector('.nav-header__logout');
  const toUserProfile = navbar.querySelector('.nav-header__to-user-profile');
  const toHome = navbar.querySelector('.nav-header__to-home');

  
  const svgLogout = document.querySelector('.nav-header__logout--icon').querySelector('path')
  const svgUserProfile = document.querySelector('.nav-header__to-user-profile--icon').querySelector('path')
  const svgHome = document.querySelector('.nav-header__to-home--icon').querySelector('path')

  svgLogout.setAttribute('d', svg.logout)
  svgUserProfile.setAttribute('d', svg.userProfile)
  svgHome.setAttribute('d', svg.home)
    
  const toggleNav = navbar.querySelector('.nav-header__menu');
  const nav = navbar.querySelector('.nav-header__navbar');
    
    toggleNav.addEventListener('click', (event)  => {
      event.preventDefault();
      toggleNav.classList.toggle('close')
      nav.classList.toggle('show')
    })
    
    
    homePage.addEventListener('click', (event)  => {
      if((nav.classList).contains('show')){
        event.preventDefault();
        nav.classList.remove('show')
        toggleNav.classList.remove('close')
      }
    })

    toUserProfile.addEventListener('click', (event) => {
      event.preventDefault();
      clearForms();
      resetAlert(alert);
      setOn(homeUser, profileButtons);
      setOff(homeMain, profileForms, profileUserPosts, profileFavs);
    });

    toHome.addEventListener('click', (event) => {
      event.preventDefault();
      clearForms();
      resetAlert(alert);
      setOn(homeMain);
      setOff(homeUser, profileButtons, profileForms,profileUserPosts, profileFavs);
      //initPostsList(context.userAuth, postModal, 'all');
    });
    

    toLogout.addEventListener('click', (event) => {
      event.preventDefault();
      clearForms();
      resetAlert(alert);
      delete context.userAuth;
      setOff(homePage, homeMain, homeUser, profileButtons, profileForms,profileUserPosts, profileFavs, navbar)
      setOn(loginPage, login)
      setPredeterminateAvatar()
    });
    
    return navbar
}

