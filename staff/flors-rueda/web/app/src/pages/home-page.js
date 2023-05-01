/*
import initPostModal from '../components/post-modal.js';
;*/

import { context,  } from '../ui/general-tools.js';
import initNavbar from '../components/nav-bar.js';
import initPostModal from '../components/post-modal.js';
import initNewPostButton from '../components/new-post-button.js';

export const homePage = document.querySelector('.home-page');
export const homeMain = document.querySelector('.home-page__main');
export const homeUser = document.querySelector('.home-page__user-profile')
export const postModal = initPostModal(context);
export const navbar = initNavbar(context, homePage, homeMain, homeUser, postModal);

initNewPostButton(postModal)



  

