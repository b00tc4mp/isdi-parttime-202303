import { getPostsSorted } from '../logic/retrieve-posts-sorted-by-date.mjs';
import { uploadPost } from '../logic/upload-post.mjs';
import { updatePost } from '../logic/update-post.mjs';
import { retrieveUser } from '../logic/retrieve-user.mjs';
import { closeModal, openModal } from './general-tools.mjs';
import { postModal } from '../pages/home-posts-modal-page.mjs';

const renderPost = (post, userAuth) => {
  const postAuthor = retrieveUser(post.author);
  const postArticle = document.createElement('article');
  postArticle.classList.add('post');
  let html = `<div class="post-author-data">
                  <img class="post-author-avatar" src="${postAuthor.avatar}" />
                  <p class="post-author-name">${postAuthor.name}</p>
                  <p class="post-author-username">${postAuthor.username}</p>
                </div>
                <div class="post-main-data">
                  <img class="post-image" src="${post.image}" />
                  <p class="post-text">${post.text}</p>
                </div>
                <div class="post-stats-data">`;
  let timeDifference = new Date() - post.date;
  const hours = Math.floor(timeDifference / 3600000);
  if (hours <= 24) {
    const minutes = Math.floor(timeDifference / 60000);
    if (hours > 0) html += `<time class="post-date">${hours} hours ago</time>`;
    if (hours === 0 && minutes > 0)
      html += `<time class="post-date">${minutes} minutes ago</time>`;
    if (minutes === 0) html += `<time class="post-date">just now</time>`;
  } else {
    html += `<time class="post-date">${post.date.toLocaleDateString(
      "en-GB"
    )}</time>`;
  }
  if (post.author === userAuth) {
    html += `<svg class="to-edit-post" data-post-id="${post.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M180 1044q-24 0-42-18t-18-42V384q0-24 18-42t42-18h405l-60 60H180v600h600V636l60-60v408q0 24-18 42t-42 18H180Zm300-360Zm182-352 43 42-285 284v86h85l286-286 42 42-303 304H360V634l302-302Zm171 168L662 332l100-100q17-17 42.311-17T847 233l84 85q17 18 17 42.472T930 402l-97 98Z"/></svg>
      </div>`;
  } else {
    html += `</div>`;
  }
  postArticle.innerHTML = html
  return postArticle;
};


//TODO find out why sometimes doesnt replace old post correctly and fails to autofill de placeholders
const editPost = (event, posts) => {
  const postId = event.target.dataset.postId;
  const post = posts.find(post => post.id === postId);
  openModal(postModal, post);
}

export const renderAllPosts = (userAuth) => {
  const posts = getPostsSorted();
  const postList = document.querySelector('.posts-display');
  postList.innerHTML = '';
  posts.forEach(post => {
    const postElement = renderPost(post, userAuth);
    postList.appendChild(postElement);
    if(userAuth === post.author) {
      const editButton = postElement.querySelector('.to-edit-post');
      editButton.addEventListener('click', (event) => {
        event.preventDefault();
        editPost(event, posts);
      });
    }
  });
};

export const post = (postImg, postText, userAuth, postModal) => {
  if(postModal.classList.contains('creating')) uploadPost(postImg, postText, userAuth)
  else {
    let postId = (postModal.classList.value).split('editing-')[1];
    updatePost(postText, postImg, postId)
  }
  
  closeModal(postModal);
  renderAllPosts(userAuth);
};
