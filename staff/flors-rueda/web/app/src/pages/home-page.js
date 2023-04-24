/*
import initPostModal from '../components/post-modal.js';
;*/

import { context,  } from '../ui/general-tools.js';
import initNavbar from '../components/nav-bar.js';

export const homePage = document.querySelector('.home-page');
export const homeMain = document.querySelector('.home-page__main');
export const homeUser = document.querySelector('.home-page__user-profile')
//export const postModal = initPostModal(context);



export const navbar = initNavbar(context, homePage, homeMain, homeUser, /*postModal*/)





/*
const toNewPost = document.querySelector('.to-new-post');

toNewPost.addEventListener('click', (event) => {
  event.preventDefault();
  postModal.openPostModal();
});
*/





  

