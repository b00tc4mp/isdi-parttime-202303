import { svg } from '../../assets/svg-paths.js';
import { updatePost } from '../logic/update-post.js';
import { uploadPost } from '../logic/upload-post.js';
import { clearForms, getImgUrl, setOn, toggleOff, setOff, stripHTML} from '../ui/general-tools.js';
import initPostsList from './posts-list.js';


export default function initPostModal(context) {
    const addPostModal = document.querySelector('.post-modal');

    const postModalForm = document.querySelector('.post-modal__form')

    const setNewPostImg = postModalForm.querySelector('.post-modal__set-img');
    const svgImg = setNewPostImg.querySelector('path');
    svgImg.setAttribute('d', svg.newImage);

    const temporalNewPostImg = postModalForm.querySelector('input[type="file"]');
    const deleteNewPostImg = postModalForm.querySelector('.input__file-delete');
    const selectedNewPostImg = document.querySelector('.post-modal__selected-image');
    const newPostTextInput = postModalForm.querySelector('textarea');
    const sendPost = postModalForm.querySelector('.post-modal__form--submit');
    const cancelPost = document.querySelector('.post-modal__cancel');
    const deletePost = document.querySelector('.post-modal__form--delete');
    let newPostImg;

    const openPostModal = (previousPost) => {
        const userAuth = context.userAuth
        const title = document.querySelector('.post-modal__title');
        const button = document.querySelector('.post-modal__form--submit');
        const modalContent = document.querySelector('.post-modal__content');
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
          addPostModal.classList.add(`editing-${previousPost.id}`);
          title.innerHTML = 'Edit';
          button.innerHTML = 'save';
        } else {
          addPostModal.classList.add('creating');
          title.innerHTML = 'Create';
          button.innerHTML = 'post';
        }
        const blur = document.querySelector('.blur');
        setOn(addPostModal, blur);
      };
      
      const clearPostModal = () => {
        clearForms();
        addPostModal.className = 'post-modal';
        selectedNewPostImg.src = 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg';
        setOn(setNewPostImg);
      };
      
      const closePostModal = () => {
        clearPostModal(addPostModal);
        const blur = document.querySelector('.blur');
        window.onscroll = () =>{};
        setOff(addPostModal, blur);
      };

    cancelPost.addEventListener('click', (event) => {
        event.preventDefault();
        clearForms();
        closePostModal()
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
        temporalNewPostImg.value = '';
        newPostImg = undefined;
        selectedNewPostImg.src = 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg';
        toggleOff(deleteNewPostImg, setNewPostImg);
    });

    sendPost.addEventListener('submit', (event) => {
        event.preventDefault();
        try {
            const userAuth = context.userAuth
            const newPostText = newPostTextInput.value;
            const cleanText = stripHTML(newPostText)
            post(newPostImg, cleanText, userAuth);
        } catch (error) {
            console.error(error);
        }
    });

    const post = (postImg, postText) => {
        const userAuth = context.userAuth
        if (addPostModal.classList.contains('creating'))
            uploadPost(postImg, postText, userAuth);
        else {
            let postId = addPostModal.classList.value.split('editing-')[1];
            updatePost(postText, postImg, postId, userAuth);
        }
        closePostModal();
        initPostsList(userAuth, addPostModal, 'all');
    };

    return { addPostModal, openPostModal, closePostModal }
}
