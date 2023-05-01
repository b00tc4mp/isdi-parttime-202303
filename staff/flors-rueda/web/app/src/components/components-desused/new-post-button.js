import { svg } from '../../assets/svg-paths.js';

export default function initNewPostButton(postModal) {
    const toNewPost = document.querySelector('.home-page__new-post--button');

    const svgNewPost = document.querySelector('.home-page__new-post--svg').querySelector('path')
    
    svgNewPost.setAttribute('d', svg.plus)

    toNewPost.addEventListener('click', (event) => {
      event.preventDefault();
      postModal.openPostModal();
    });
}