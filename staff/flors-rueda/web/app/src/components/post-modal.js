import { updatePost } from '../logic/update-post.js';
import { uploadPost } from '../logic/upload-post.js';
import { clearForms, getImgUrl, setOn, toggleOff, setOff} from '../ui/general-tools.js';
import initPostsList from './posts-list.js';


export default function initPostModal(userAuth) {
    const addPostModal = document.querySelector('.post-modal');

    const openPostModal = (previousPost) => {
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
        const selectedNewPostImg = document.querySelector('.new-post-image');
        const setNewPostImg = document.querySelector('.set-image');
        selectedNewPostImg.src = 'https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg';
        setOn(setNewPostImg);
      };
      
      const closePostModal = () => {
        clearPostModal(addPostModal);
        const blur = document.querySelector('.blur');
        window.onscroll = () =>{};
        setOff(addPostModal, blur);
      };



    const temporalNewPostImg = document.querySelector('.add-post-image').querySelector('input[type="file"]');
    const deleteNewPostImg = document.querySelector('.add-post-image').querySelector('.delete-img');
    const setNewPostImg = document.querySelector('.set-image');
    const selectedNewPostImg = document.querySelector('.new-post-image');
    const newPostTextInput = document.querySelector('.new-post-form').querySelector('textarea[name="post-text"]');
    const sendPost = document.querySelector('.new-post-form');
    const cancelPost = document.querySelector('.cancel-post');
    let newPostImg;


    cancelPost.addEventListener('click', (event) => {
        event.preventDefault();
        clearForms();
        selectedNewPostImg.src = 'https://sgame.etsisi.upm.es/pictures/12946.png';
        setOn(setNewPostImg);
        closePostModal(addPostModal)
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
        try {
            const newPostText = newPostTextInput.value;
            post(newPostImg, newPostText, userAuth);
        } catch (error) {
            console.error(error);
        }
    });

    const post = (postImg, postText, userAuth) => {
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