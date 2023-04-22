import { context,  } from '../ui/general-tools.js';
import initPostModal from '../components/post-modal.js';
import initNavbar from '../components/nav-bar.js';

export const homePage = document.querySelector('.home');
export const mainHome = document.querySelector('.home-main');
export const profileForms = document.querySelector('.profile-forms');
export const postModal = initPostModal(context);

const navbar = initNavbar(context, homePage, mainHome, postModal, profileForms)

const toNewPost = document.querySelector('.to-new-post');



toNewPost.addEventListener('click', (event) => {
  event.preventDefault();
  postModal.openPostModal();
});


  

