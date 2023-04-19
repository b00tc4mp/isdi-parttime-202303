import { setOn, clearForms, setOff } from './general-tools.js';
import { uploadPost } from '../logic/upload-post.js';
import { updatePost } from '../logic/update-post.js';
import { postModal } from '../pages/home-posts-modal-page.js';
import { renderAllPosts } from '../components/posts-render.js';

export const openPostModal = (modal, previousPost) => {
  const title = document.querySelector('.modal-title');
  const button = document.querySelector('.save-post');
  const modalContent = document.querySelector('.post-modal-content');
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  modalContent.style.top = `${viewportHeight / 2 - modalContent.offsetHeight / 2}px`;
  modalContent.style.left = `${viewportWidth / 2 - modalContent.offsetWidth / 2}px`;

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  window.onscroll = () => {
    window.scrollTo(scrollLeft, scrollTop);
  }

  if (previousPost) {
    postModal.classList.add(`editing-${previousPost.id}`);
    title.innerHTML = 'Edit';
    button.innerHTML = 'save';
  } else {
    modal.classList.add('creating');
    title.innerHTML = 'Create';
    button.innerHTML = 'post';
  }
  const blur = document.querySelector('.blur');
  setOn(modal, blur);
};


export const clearPostModal = (modal) => {
  clearForms();
  modal.className = 'post-modal';
  const selectedNewPostImg = document.querySelector('.new-post-image');
  const setNewPostImg = document.querySelector('.set-image');
  selectedNewPostImg.src = 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg';
  setOn(setNewPostImg);
};

export const closePostModal = (modal) => {
  clearPostModal(modal);
  const blur = document.querySelector('.blur');
  window.onscroll = () =>{};
  setOff(modal, blur);
};



export const post = (postImg, postText, userAuth, postModal) => {
  if (postModal.classList.contains('creating'))
    uploadPost(postImg, postText, userAuth);
  else {
    let postId = postModal.classList.value.split('editing-')[1];
    updatePost(postText, postImg, postId, userAuth);
  }
  closePostModal(postModal);
  renderAllPosts(userAuth, postModal);
};
