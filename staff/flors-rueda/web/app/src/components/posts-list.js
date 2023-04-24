import { retrieveUser } from '../logic/retrieve-user.js';
import { toggleFav } from '../logic/toggle-fav.js';
import { toggleLike } from '../logic/toggle-like.js';
import { isPostFavByUser } from '../logic/data/helpers.js';
import { getPostsSorted } from '../logic/retrieve-posts-sorted-by-date.js';
import { getFavPosts } from '../logic/retrieve-fav-posts.js';


export default function initPostsList(userAuth, postModal, type, postContainer = document.querySelector('.posts-list')) {
  const favUnfillPath = 'm323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z';
  const favFillPath = 'm233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z';
  const likeFillPath = 'm480 935-41-37q-106-97-175-167.5t-110-126Q113 549 96.5 504T80 413q0-90 60.5-150.5T290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.5T880 413q0 46-16.5 91T806 604.5q-41 55.5-110 126T521 898l-41 37Z'
  const likeUnfillPath = 'm480 935-41-37q-105.768-97.121-174.884-167.561Q195 660 154 604.5T96.5 504Q80 459 80 413q0-90.155 60.5-150.577Q201 202 290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.423Q880 322.845 880 413q0 46-16.5 91T806 604.5Q765 660 695.884 730.439 626.768 800.879 521 898l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712 630 750.5 580t54-89.135q15.5-39.136 15.5-77.72Q820 347 778 304.5T670.225 262q-51.524 0-95.375 31.5Q531 325 504 382h-49q-26-56-69.85-88-43.851-32-95.375-32Q224 262 182 304.5t-42 108.816Q140 452 155.5 491.5t54 90Q248 632 314 698t166 158Zm0-297Z'

  const modal = postModal.addPostModal
  const posts = type === 'all'? getPostsSorted() : getPostsSorted(getFavPosts(userAuth));

  const fill = (item) => {
    item.classList.add('filled')
    const path = item.querySelector('path');
    if(item.classList.contains('fav-button')) {
      path.setAttribute('d', favFillPath);
    }
    if(item.classList.contains('like-button')) {
      path.setAttribute('d', likeFillPath);
    }
  };

  const unfill = (item) => {
    item.classList.remove('filled');
    const path = item.querySelector('path');
    if(item.classList.contains('fav-button')) {
      path.setAttribute('d', favUnfillPath);
    }
    if(item.classList.contains('like-button')) {
      path.setAttribute('d', likeUnfillPath);
    }
  }

  const press = (item) => {
    item.classList.contains('filled') ? unfill(item) : fill(item)
  }

  const renderPostHeader = (post, userAuth) => {
    const postAuthor = retrieveUser(post.author);
    let html = `<div class="post-header">
                    <div class="post-author-data">
                    <img class="post-author-avatar" src="${postAuthor.avatar}" />
                    <p class="post-author-name">${postAuthor.name}</p>
                    <p class="post-author-username">${postAuthor.username}</p></div>`;
    if (post.author === userAuth) {
      html += `<svg class="to-edit-post" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M180 1044q-24 0-42-18t-18-42V384q0-24 18-42t42-18h405l-60 60H180v600h600V636l60-60v408q0 24-18 42t-42 18H180Zm300-360Zm182-352 43 42-285 284v86h85l286-286 42 42-303 304H360V634l302-302Zm171 168L662 332l100-100q17-17 42.311-17T847 233l84 85q17 18 17 42.472T930 402l-97 98Z"/></svg>`;
    };
    return html += `</div>`
  }

  const renderPostBody = (post) => {
    return `<div class="post-image-container">
      <img class="post-image" src="${post.image}" />
      </div>
      <div class="post-text">${post.text}</div>`
  }

  const renderPostFooter = (post, userAuth) => {
    const isPostFav = isPostFavByUser(post.id, userAuth);
    const favPath = isPostFav ? favFillPath : favUnfillPath;
    const favClass =  isPostFav ? 'filled' : '';
    const isPostLike = (post.likes).includes(userAuth);
    const likePath = isPostLike ? likeFillPath : likeUnfillPath;
    const likeClass =  isPostLike ? 'filled' : '';

    let html = `<div class="post-footer">
      <div class="post-favorite">
      <svg class="fav-button ${favClass}" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="${favPath}"/></svg>
      <b>${post.fav}</b></div>
      <div class="post-like">
      <svg class="like-button ${likeClass}" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="${likePath}"/></svg>
      <b>${post.likes.length}</b></div>`;
    let timeDifference = new Date() - post.date;
    const hours = Math.floor(timeDifference / 3600000);
    if (hours <= 24) {
      const minutes = Math.floor(timeDifference / 60000);
      if (hours > 0)
        html += `<time class="post-date">${hours} hours ago</time></div>`;
      if (hours === 0 && minutes > 0)
        html += `<time class="post-date">${minutes} minutes ago</time>`;
      if (minutes === 0) html += `<time class="post-date">just now</time></div>`;
    } else {
      html += `<time class="post-date">${post.date.toLocaleDateString(
        "en-GB"
      )}</time></div>`;
    }
    return html
  };

  const renderPost = (post, userAuth) => {
    const postArticle = document.createElement('article');
    postArticle.classList.add('post');
    let html = renderPostHeader(post, userAuth);
    html += renderPostBody(post);
    html += renderPostFooter(post, userAuth)                      
    postArticle.innerHTML = html;
    return postArticle;
  };

  const editPost = (post) => {
    if (!modal) return;
    modal.querySelector('.new-post-image').src = post.image;
    modal.querySelector('.new-post-form').querySelector('textarea[name="post-text"]').value = post.text;
    postModal.openPostModal(post);
  };

  const addPostsList = () => {
    postContainer.innerHTML = '';
    posts.forEach((post) => {
      const postElement = renderPost(post, userAuth);
      postContainer.appendChild(postElement);
      const favButton = postElement.querySelector('.fav-button');
      const likeButton = postElement.querySelector('.like-button');
      favButton.addEventListener('click', (event) => {
        event.preventDefault();
        try {
          press(favButton)
          const fav = toggleFav(post.id, userAuth);
          postElement.querySelector('.post-favorite').querySelector('b').innerText = fav
        } catch (error) {
          console.log(error)
        }
      });
      likeButton.addEventListener('click', (event) => {
        event.preventDefault();
        try {
          press(likeButton);
          const likes = toggleLike(post.id, userAuth);
          postElement.querySelector('.post-like').querySelector('b').innerText = likes
        } catch (error) {
          console.log(error)
        }
      });
      if (userAuth === post.author) {
        const editButton = postElement.querySelector('.to-edit-post');
        editButton.addEventListener('click', (event) => {
          event.preventDefault();
          editPost(post);
        });
      }
    });
  };
  return addPostsList();
}