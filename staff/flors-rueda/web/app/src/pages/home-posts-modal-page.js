import { clearForms, getImgUrl, setOn, toggleOff, } from '../ui/general-tools.js';
import { context } from '../ui/general-tools.js';
import { closePostModal, post } from '../ui/posts.js';

export const postModal = document.querySelector('.post-modal');

const temporalNewPostImg = document.querySelector('.add-post-image').querySelector('input[type="file"]');
const deleteNewPostImg = document.querySelector('.add-post-image').querySelector('.delete-img');
const setNewPostImg = document.querySelector('.set-image');
const selectedNewPostImg = document.querySelector('.new-post-image');
const newPostTextInput = document.querySelector('.new-post-form').querySelector('input[name="post-text"]');
const sendPost = document.querySelector('.new-post-form');
const cancelPost = document.querySelector('.cancel-post');
let newPostImg;


cancelPost.addEventListener('click', (event) => {
  event.preventDefault();
  clearForms();
  selectedNewPostImg.src = 'https://sgame.etsisi.upm.es/pictures/12946.png';
  setOn(setNewPostImg);
  closePostModal(postModal)
});
  
temporalNewPostImg.addEventListener('change', (event) => {
  try {
    toggleOff(deleteNewPostImg, setNewPostImg);
    getImgUrl(event, (imageUrl) => {
      newPostImg = imageUrl;
      selectedNewPostImg.src = newPostImg;
    });
  } catch (error) {
    console.error(error);
  }
});


deleteNewPostImg.addEventListener('click', (event) => {
  event.preventDefault();
  newPostImg = undefined;
  temporalNewPostImg.value = '';
  selectedNewPostImg.src = 'https://sgame.etsisi.upm.es/pictures/12946.png';
  toggleOff(deleteNewPostImg, setNewPostImg);
});
  
sendPost.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const newPostText = newPostTextInput.value;
  post(newPostImg, newPostText, context.userAuth, postModal)
})